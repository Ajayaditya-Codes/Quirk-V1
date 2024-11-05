ALTER TABLE "Users" RENAME COLUMN "Clerk_ID" TO "ClerkID";--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "SlackAccessToken" text;