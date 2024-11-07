import { Octokit } from "octokit";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "User not found" }, { status: 401 });
  }

  const provider = "oauth_github";
  const user = await currentUser();

  const clerkResponse: any = await clerkClient();
  const token = await clerkResponse.users.getUserOauthAccessToken(
    userId,
    provider
  );

  const accessToken = (await token.data[0].token) || "";

  if (!accessToken) {
    return NextResponse.json(
      { message: "Access token not found" },
      { status: 401 }
    );
  } else {
    const octokit = new Octokit({
      auth: accessToken,
    });

    const repos = await octokit.request("GET /user/repos", {});

    return NextResponse.json(repos.data);
  }
}
