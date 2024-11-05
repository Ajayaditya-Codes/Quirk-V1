import { db } from "@/db/drizzle";
import { Users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code is missing" },
      { status: 400 }
    );
  }

  const tokenUrl = "https://app.asana.com/-/oauth_token";
  const clientId = process.env.ASANA_CLIENT_ID;
  const clientSecret = process.env.ASANA_CLIENT_SECRET;
  const redirectUri = process.env.ASANA_REDIRECT_URI;

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId as string,
        client_secret: clientSecret as string,
        redirect_uri: redirectUri as string,
        code: code as string,
      }),
    });

    const data = await response.json();
    console.log("access", data.access_token);
    console.log("refresh", data.refresh_token);

    if (!data.access_token) {
      return NextResponse.json(
        { error: "Failed to retrieve access token" },
        { status: 400 }
      );
    }

    await updateAsanaAccessToken(data.refresh_token);

    return NextResponse.redirect("https://localhost:3000/connections");
  } catch (error) {
    console.error("Error during token exchange:", error);
    return NextResponse.json(
      { error: "Token exchange failed" },
      { status: 500 }
    );
  }
}

async function updateAsanaAccessToken(asanaAccessToken: string) {
  const { userId } = await auth();
  try {
    userId &&
      (await db
        .update(Users)
        .set({
          AsanaRefreshToken: asanaAccessToken,
        })
        .where(eq(Users.ClerkID, userId)));
  } catch (error) {
    console.error("Error updating Asana access token:", error);
    throw new Error("Failed to update Asana access token");
  }
}
