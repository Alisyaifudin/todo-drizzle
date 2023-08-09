import { InferModel } from "drizzle-orm";
import { date, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
 
export const tasks = pgTable('tasks', {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    completed: text("completed").notNull().default("false"),
    createdAt: date("created_at", { mode: "date"}).defaultNow().notNull(),
    updatedAt: date("updated_at", { mode: "date"}).defaultNow().notNull()
});

type Task = InferModel<typeof tasks, "select">;