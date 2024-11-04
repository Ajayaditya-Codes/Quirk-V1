ALTER TABLE "todo" RENAME TO "Users";--> statement-breakpoint
ALTER TABLE "Users" RENAME COLUMN "id" TO "Clerk_ID";--> statement-breakpoint
ALTER TABLE "Users" RENAME COLUMN "username" TO "Username";--> statement-breakpoint
ALTER TABLE "Users" RENAME COLUMN "email" TO "Email";