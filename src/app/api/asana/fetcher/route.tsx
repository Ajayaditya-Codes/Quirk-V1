import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { Users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const user = await db
    .select()
    .from(Users)
    .where(eq(Users.ClerkID, userId))
    .execute();
  if (!user.length || !user[0].AsanaRefreshToken) {
    return NextResponse.json(
      { error: "No Asana refresh token found" },
      { status: 404 }
    );
  }

  const asanaRefreshToken = user[0].AsanaRefreshToken;
  const tokenUrl = "https://app.asana.com/-/oauth_token";
  const clientId = process.env.ASANA_CLIENT_ID;
  const clientSecret = process.env.ASANA_CLIENT_SECRET;
  const redirectUri = process.env.ASANA_REDIRECT_URI;

  try {
    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: clientId as string,
        client_secret: clientSecret as string,
        refresh_token: asanaRefreshToken,
        redirect_uri: redirectUri as string,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return NextResponse.json(
        { error: "Failed to retrieve access token" },
        { status: 400 }
      );
    }

    const accessToken = tokenData.access_token;

    const userEndpoint = "https://app.asana.com/api/1.0/users/me";
    const userResponse = await fetch(userEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userData = await userResponse.json();

    if (!userData || !userData.data || !userData.data.workspaces) {
      return NextResponse.json(
        { error: "Failed to fetch user workspaces" },
        { status: 400 }
      );
    }

    const workspaces = userData.data.workspaces;
    const workspaceProjectsPromises = workspaces.map(async (workspace: any) => {
      const projectsResponse = await fetch(
        `https://app.asana.com/api/1.0/workspaces/${workspace.gid}/projects`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const projectsData = await projectsResponse.json();

      return {
        workspace: {
          id: workspace.gid,
          name: workspace.name,
        },
        projects: projectsData.data,
      };
    });

    const workspaceProjects = await Promise.all(workspaceProjectsPromises);
    return NextResponse.json({
      message: "Successfully retrieved workspaces and projects",
      data: workspaceProjects,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to retrieve data" },
      { status: 500 }
    );
  }
}
