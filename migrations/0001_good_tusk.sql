ALTER TABLE "Users" ALTER COLUMN "Workflows" SET DEFAULT ARRAY[]::text[];--> statement-breakpoint
ALTER TABLE "Workflows" ALTER COLUMN "SlackNodes" SET DEFAULT ARRAY[]::jsonb[];--> statement-breakpoint
ALTER TABLE "Workflows" ALTER COLUMN "AsanaNode" SET DEFAULT ARRAY[]::jsonb[];