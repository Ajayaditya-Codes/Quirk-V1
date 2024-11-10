import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { getAuth } from "@clerk/nextjs/server";
import { Logs, Users, Workflows } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: NextRequest) {
  const { userId, getToken } = await getAuth(req); // Automatically retrieves session context
  const sessionToken = await getToken(); // This will fetch the session token

  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  if (!sessionToken) {
    return NextResponse.json(
      { message: "Session token not found" },
      { status: 401 }
    );
  }

  const user = await db
    .select()
    .from(Users)
    .where(eq(Users.ClerkID, userId))
    .execute();

  if (user.length === 0) {
    return NextResponse.json({ error: "No User found" }, { status: 404 });
  }

  const { workflowName } = await req.json();

  if (!workflowName) {
    return NextResponse.json(
      { error: "Workflow name not provided" },
      { status: 400 }
    );
  }

  const currentWorkflows = user[0].Workflows || [];

  if (!currentWorkflows.includes(workflowName)) {
    return NextResponse.json(
      { error: "Workflow name does not exist" },
      { status: 400 }
    );
  }

  // Remove the workflow name from the user's workflows
  const updatedWorkflows = currentWorkflows.filter(
    (name) => name !== workflowName
  );

  try {
    const existingWorkflow = await db
      .select()
      .from(Workflows)
      .where(eq(Workflows.WorkflowName, workflowName))
      .execute();

    type GithubData = { repoName: string; listenerType: string };

    const GithubData: GithubData = existingWorkflow[0].GitHubNode as GithubData;

    if (existingWorkflow.length === 0) {
      return NextResponse.json(
        { error: "Workflow not found" },
        { status: 404 }
      );
    }

    // Update the user's workflows
    await db
      .update(Users)
      .set({ Workflows: updatedWorkflows })
      .where(eq(Users.ClerkID, userId))
      .execute();

    // Delete the workflow from the Workflows table
    await db
      .delete(Workflows)
      .where(eq(Workflows.WorkflowName, workflowName))
      .execute();

    if (existingWorkflow[0].HookID) {
      try {
        const response = await fetch(
          "https://localhost:3000/api/github/webhooks/delete",
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${sessionToken}`, // send Clerk token here
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              repo: GithubData.repoName,
              hookId: existingWorkflow[0].HookID,
            }),
          }
        );
        if (!response.ok) {
          await db.insert(Logs).values({
            LogMessage: `Failed to Delete Old Webhook ${existingWorkflow[0].HookID}`,
            WorkflowName: workflowName,
            Success: false,
          });
        }

        await db.insert(Logs).values({
          LogMessage: `Deleted Old Webhook ${existingWorkflow[0].HookID}`,
          WorkflowName: workflowName,
          Success: true,
        });
      } catch (error) {
        await db.insert(Logs).values({
          LogMessage: `Failed to Delete Old Webhook ${existingWorkflow[0].HookID}`,
          WorkflowName: workflowName,
          Success: false,
        });
      }
    }

    // Log the deletion
    await db.insert(Logs).values({
      LogMessage: `Workflow ${workflowName} deleted by ${user[0].Username}`,
      WorkflowName: workflowName,
      Success: true,
    });
  } catch (error) {
    console.error("Failed to delete workflow:", error);
    // Log failure
    await db.insert(Logs).values({
      LogMessage: `Failed to delete Workflow ${workflowName}`,
      WorkflowName: workflowName,
      Success: false,
    });
    return NextResponse.json(
      { error: "Failed to delete workflow" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Workflow deleted successfully" });
}
