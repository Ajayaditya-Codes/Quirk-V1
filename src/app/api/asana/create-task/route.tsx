// import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { Users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const Asana = require("asana");
  const { projectIds, taskName, taskNotes, token } = await req.json();
  let asanaRefreshToken = token;

  if (!projectIds || !taskName) {
    return NextResponse.json(
      { error: "Project IDs and task name are required" },
      { status: 400 }
    );
  }

  if (asanaRefreshToken === null) {
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

    asanaRefreshToken = user[0].AsanaRefreshToken;
  }

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

    const client = Asana.ApiClient.instance;
    const token = client.authentications["token"];
    token.accessToken = tokenData.access_token;
    const tasksApiInstance = new Asana.TasksApi();

    const body = {
      data: {
        name: taskName,
        approval_status: "pending",
        assignee_status: "upcoming",
        completed: false,
        assignee: "me",
        projects: projectIds,
        taskNotes: taskNotes,
      },
    };
    const opts = {};

    try {
      const result = await tasksApiInstance.createTask(body, opts);
      return NextResponse.json({
        message: "Task created successfully",
        data: result?.data,
      });
    } catch (error: any) {
      console.error("Failed to create task:", error?.response?.body);
      return NextResponse.json(
        {
          message: "Failed to create task",
          error: error?.response?.body,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to retrieve data" },
      { status: 500 }
    );
  }
}
