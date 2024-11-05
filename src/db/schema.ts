import { integer, text, boolean, pgTable } from "drizzle-orm/pg-core";

export const Users = pgTable("Users", {
  ClerkID: text("ClerkID").primaryKey(),
  Username: text("Username").notNull(),
  Email: text("Email").notNull().unique(),
  Credits: integer("Credits").notNull(),
  SlackAccessToken: text("SlackAccessToken"),
  AsanaRefreshToken: text("AsanaRefreshToken"),
});
