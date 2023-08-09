"use client";

import { useState } from "react";

// import { db } from "@/db";
// import { tasks } from "@/db/schema";

const originalTasks = [
	{
		id: 1,
		name: "Task 1",
		completed: false,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 2,
		name: "Task 2",
		completed: false,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

export default function Home() {
	const [tasks, setTasks] = useState(originalTasks);
	const handleCheck = (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTasks = tasks.map((task) => {
			if (task.id === id) {
				task.completed = e.target.checked;
			}
			return task;
		});
		setTasks(newTasks);
	};
	const handleDelete = (id: number) => () => {
		const newTasks = tasks.filter((task) => task.id !== id);
		setTasks(newTasks);
	};

	const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;

		const data = new FormData(form);
		const name = data.get("task") as string;
		const ids = tasks.length > 0 ? tasks.map((task) => task.id) : [0];
		const maxId = Math.max(...ids);
		const newTasks = [
			...tasks,
			{
				id: maxId + 1,
				name,
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];
		setTasks(newTasks);
    form.reset();
    // focus on the input
    const input = form.querySelector<HTMLInputElement>('input[name="task"]');
    input?.focus();
	};

	return (
		<main className="flex m-10 flex-col gap-3">
			<h1 className="text-xl font-bold">To Do List</h1>
			<form onSubmit={handleAdd} className="flex gap-1 justify-between w-full">
				<input
					name="task"
					className="flex-1 px-1 text-black border-2 rounded-md border-gray-500"
					type="text"
				/>
				<button className="bg-blue-500 text-white rounded-md px-3 py-1">Add</button>
			</form>
			<ul className="flex flex-col gap-1 w-full">
				{tasks.map((task) => (
					<li key={task.id} className="flex gap-1 justify-between w-full">
						<label
							htmlFor={"task" + task.id}
							className={`flex-1 ${task.completed ? "line-through" : null}`}
						>
							{task.name}
						</label>
						<input
							onChange={handleCheck(task.id)}
							className="hidden"
							id={"task" + task.id}
							name="task"
							type="checkbox"
						/>
						<button onClick={handleDelete(task.id)} className="text-white rounded-md">
							🗑️
						</button>
					</li>
				))}
			</ul>
		</main>
	);
}
