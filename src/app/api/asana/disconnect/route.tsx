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
  if (!user.length || !user[0].AsanaRefreshToken) {
    return NextResponse.json(
      { error: "No Asana refresh token found" },
      { status: 404 }
    );
  }

  const asanaRefreshToken = user[0].AsanaRefreshToken;
  const asanaRevokeURL = "https://app.asana.com/-/oauth_revoke";

  try {
    const response = await fetch(asanaRevokeURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.ASANA_CLIENT_ID as string,
        client_secret: process.env.ASANA_CLIENT_SECRET as string,
        token: "sandhfq",
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      return NextResponse.json(
        { error: data.error || "Failed to revoke token" },
        { status: 400 }
      );
    }

    await db
      .update(Users)
      .set({ AsanaRefreshToken: null })
      .where(eq(Users.ClerkID, userId))
      .execute();

    return NextResponse.json({ message: "Asana access revoked successfully" });
  } catch (error) {
    console.error("Error revoking Asana access token:", error);
    return NextResponse.json(
      { error: "Failed to revoke Asana access token" },
      { status: 500 }
    );
  }
}
