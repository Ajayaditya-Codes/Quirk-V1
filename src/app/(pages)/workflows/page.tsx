import React from "react";
import { db } from "@/db/drizzle";
import { Users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import WorkflowButton from "@/components/global/workflowButton";
import WorkflowCard from "@/components/global/workflowCard";
import { IconInfoCircle } from "@tabler/icons-react";

export default async function Page() {
  const { userId } = await auth();
  let userDetails = null;
  try {
    const result =
      userId &&
      (await db
        .select()
        .from(Users)
        .where(eq(Users.ClerkID, userId))
        .execute());

    userDetails = result && result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }

  return (
    <div className="flex flex-col w-full overflow-scroll p-5">
      <header className="flex flex-row justify-between items-center mb-10">
        <h1 className="text-4xl font-bold ">Worklfows</h1>
        <WorkflowButton bgDisabled={false} />
      </header>
      <div className="flex flex-col space-y-5">
        {userDetails && userDetails.Workflows.length > 0 ? (
          <>
            {userDetails.Workflows.map((workflow, index) => (
              <WorkflowCard key={index} name={workflow} />
            ))}
            <small className="flex w-full items-center justify-center flex-row space-x-2">
              <IconInfoCircle size={20} />
              <p className="text-lg">
                Please create only one workflow per repository. Adding multiple
                workflows for the same repository may result in unexpected
                behavior.
              </p>
            </small>
          </>
        ) : (
          <div className="flex  w-full h-[30vh] justify-center items-end">
            <div className="flex flex-row items-center text-2xl font-semibold">
              No Workflows Found! Create a New Workflow{" "}
              <WorkflowButton bgDisabled={true} />
            </div>
          </div>
        )}{" "}
      </div>
    </div>
  );
}
