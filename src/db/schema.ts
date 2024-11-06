import { sql } from "drizzle-orm";
import {
  integer,
  text,
  jsonb,
  pgTable,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const Users = pgTable("Users", {
  ClerkID: text("ClerkID").primaryKey(),
  Username: text("Username").notNull(),
  Email: text("Email").notNull().unique(),
  Credits: integer("Credits").notNull(),
  SlackAccessToken: text("SlackAccessToken"),
  AsanaRefreshToken: text("AsanaRefreshToken"),
  Workflows: text("Workflows")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
});

export const Workflows = pgTable("Workflows", {
  WorkflowName: text("WorkflowName").primaryKey(),
  GitHubNode: jsonb("GitHubNode")
    .notNull()
    .default(sql`'{}'::jsonb`),
  SlackNodes: jsonb("SlackNodes")
    .array()
    .notNull()
    .default(sql`ARRAY[]::jsonb[]`),
  AsanaNode: jsonb("AsanaNode")
    .array()
    .notNull()
    .default(sql`ARRAY[]::jsonb[]`),
});

export const Logs = pgTable("Logs", {
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .primaryKey(),
  LogMessage: text("LogMessage").notNull(),
  WorkflowName: text("WorkflowName").notNull(),
  Success: boolean("Success"),
});
