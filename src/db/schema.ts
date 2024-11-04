import { integer, text, boolean, pgTable } from "drizzle-orm/pg-core";

export const Users = pgTable("Users", {
  Clerk_ID: text("Clerk_ID").primaryKey(),
  Username: text("Username").notNull(),
  Email: text("Email").notNull().unique(),
  Credits: integer("Credits").notNull(),
});
