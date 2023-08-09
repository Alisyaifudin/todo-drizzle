import { db } from "@/db"
import { tasks } from "@/db/schema"

export default async function Home() {
  const result = await db.select().from(tasks);
  return (
    <main>
      <h1>To Do List</h1>

    </main>
  )
}
