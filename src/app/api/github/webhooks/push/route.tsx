import { Octokit } from "octokit";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

  const { repo, workflow } = await req.json();
  if (!repo || !workflow) {
    return NextResponse.json(
      { message: "Repository name and Workflow name are required" },
      { status: 400 }
    );
  }

  const owner = user?.username;

  const octokit = new Octokit({
    auth: accessToken,
  });

  const slug = repo?.split("/").pop();
  console.log(owner, slug);

  try {
    const response = await octokit.request("POST /repos/{owner}/{repo}/hooks", {
      owner: owner || "",
      repo: slug,
      name: "web",
      active: true,
      events: ["push"],
      config: {
        url: "https://patient-husky-uniquely.ngrok-free.app/api/github/handler",
        content_type: "json",
        insecure_ssl: "0",
      },
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    return NextResponse.json({
      message: "Webhook created successfully",
      data: response.data,
      hook_id: response.data.id,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error creating webhook", error: error },
      { status: 500 }
    );
  }
}
