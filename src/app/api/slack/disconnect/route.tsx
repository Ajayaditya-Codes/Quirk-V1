import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { Users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
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

  if (!user.length || !user[0].SlackAccessToken) {
    return NextResponse.json(
      { error: "No Slack access token found" },
      { status: 404 }
    );
  }

  const slackAccessToken = user[0].SlackAccessToken;
  const slackRevokeURL = "https://slack.com/api/auth.revoke";

  try {
    const response = await fetch(slackRevokeURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${slackAccessToken}`,
      },
    });

    const data = await response.json();

    if (!data.ok) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    await db
      .update(Users)
      .set({ SlackAccessToken: null }) // or false based on your database design
      .where(eq(Users.ClerkID, userId))
      .execute();

    return NextResponse.json({ message: "Slack access revoked successfully" });
  } catch (error) {
    console.error("Error revoking Slack access token:", error);
    return NextResponse.json(
      { error: "Failed to revoke Slack access token" },
      { status: 500 }
    );
  }
}
