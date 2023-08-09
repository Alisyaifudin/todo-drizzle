import { InferModel } from "drizzle-orm";
import { boolean, date, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	completed: boolean("completed").default(false).notNull(),
	createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
	updatedAt: date("updated_at", { mode: "date" }).defaultNow().notNull(),
});

type Task = InferModel<typeof tasks, "select">;
