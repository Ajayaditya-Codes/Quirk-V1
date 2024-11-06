CREATE TABLE IF NOT EXISTS "Logs" (
	"created_at" timestamp PRIMARY KEY DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"LogMessage" text NOT NULL,
	"WorkflowName" text NOT NULL,
	"Success" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"ClerkID" text PRIMARY KEY NOT NULL,
	"Username" text NOT NULL,
	"Email" text NOT NULL,
	"Credits" integer NOT NULL,
	"SlackAccessToken" text,
	"AsanaRefreshToken" text,
	"Workflows" text[] NOT NULL,
	CONSTRAINT "Users_Email_unique" UNIQUE("Email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Workflows" (
	"WorkflowName" text PRIMARY KEY NOT NULL,
	"GitHubNode" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"SlackNodes" jsonb[] NOT NULL,
	"AsanaNode" jsonb[] NOT NULL
);
