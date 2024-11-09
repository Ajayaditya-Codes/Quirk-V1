import { Octokit } from "octokit";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "User not found" });
  }

  const provider = "oauth_github";
  const user = await currentUser();

  const clerkResponse: any = await clerkClient();
  const token = await clerkResponse.users.getUserOauthAccessToken(
    userId,
    provider
  );

  const accessToken = token?.data?.[0]?.token || "";

  if (!accessToken) {
    return NextResponse.json(
      { message: "Access token not found" },
      { status: 401 }
    );
  }

  const { repo, hookId } = await req.json();
  const slug = repo?.split("/").pop();

  if (!repo || !hookId) {
    return NextResponse.json(
      { message: "Repository name and webhook ID are required" },
      { status: 400 }
    );
  }

  const owner = user?.username;

  const octokit = new Octokit({
    auth: accessToken,
  });
  try {
    const response = await octokit.request(
      "DELETE /repos/{owner}/{repo}/hooks/{hook_id}",
      {
        owner: owner || "",
        repo: slug,
        hook_id: parseInt(hookId),
      }
    );

    return NextResponse.json({
      message: "Webhook deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting webhook:", error);
    // Fails silently; returns a success response even if an error occurred.
    return NextResponse.json({
      message: "Webhook delete request completed (silent error ignored)",
    });
  }
}
