"use server";

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { Logs, Users, Workflows } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.DELETE_USER_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  try {
    if (evt?.data?.id) {
      const user = await db
        .select()
        .from(Users)
        .where(eq(Users.ClerkID, evt.data.id))
        .execute();

      if (user[0].Workflows) {
        for (const workflow of user[0].Workflows) {
          const existing = await db
            .select()
            .from(Workflows)
            .where(eq(Workflows.WorkflowName, workflow))
            .execute();
          if (existing.length === 0) {
            continue;
          }
          if (existing[0].HookID) {
            type github = {
              repoName: string;
              listennerType: string;
            };
            const github: github = existing[0].GitHubNode as github;
            try {
              await fetch("https://localhost:3000/api/github/webhooks/delete", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  repo: github.repoName,
                  hookId: existing[0].HookID,
                  id: evt.data.id,
                }),
              });
            } catch (error) {
              return;
            }
          }
          await db
            .delete(Workflows)
            .where(eq(Workflows.WorkflowName, workflow))
            .execute();
          await db
            .delete(Logs)
            .where(eq(Logs.WorkflowName, workflow))
            .execute();
        }
      }

      await db.delete(Users).where(eq(Users.ClerkID, evt.data.id)).execute();
    }
    return new Response("", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error occured", { status: 500 });
  }
}
