import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { Logs, Workflows } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const { workflowName, nodes, edges, githubData, publish } = await req.json();

  if (!workflowName || !nodes || !edges || !githubData) {
    return NextResponse.json(
      { error: "Workflow name, nodes, edges, and GitHub data are required" },
      { status: 400 }
    );
  }

  try {
    // Check if the workflow exists and is associated with this user
    const existingWorkflow = await db
      .select()
      .from(Workflows)
      .where(eq(Workflows.WorkflowName, workflowName))
      .execute();

    if (existingWorkflow.length === 0) {
      return NextResponse.json(
        { error: "Workflow not found" },
        { status: 404 }
      );
    }

    // Update the workflow data
    await db
      .update(Workflows)
      .set({
        Nodes: nodes,
        Edges: edges,
        GitHubNode: githubData,
        ...(publish === true && { Published: true }), // Conditionally set Published to true if publish is true
      })
      .where(eq(Workflows.WorkflowName, workflowName))
      .execute();

    // Log the action
    await db.insert(Logs).values({
      LogMessage: `Workflow ${workflowName} updated by user ${userId}${
        publish === true ? " and published" : ""
      }`,
      WorkflowName: workflowName,
      Success: true,
    });

    return NextResponse.json({ message: "Workflow updated successfully" });
  } catch (error) {
    console.error("Failed to update workflow:", error);

    // Log the failure
    await db.insert(Logs).values({
      LogMessage: `Failed to update Workflow ${workflowName}`,
      WorkflowName: workflowName,
      Success: false,
    });

    return NextResponse.json(
      { error: "Failed to update workflow" },
      { status: 500 }
    );
  }
}
