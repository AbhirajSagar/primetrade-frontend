"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { CreateTaskService } from "@/services/TaskServices"

export default function CreateTaskPage() 
{
    const router = useRouter()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [message, setMessage] = useState({ type: "", content: "" })

    async function handleSubmission(e)
    {
        e.preventDefault()

        if(!title || !description)
        {
            setMessage({ type: "error", content: "All fields are required!" })
            return
        }

        const [data, err] = await CreateTaskService({ title, description })

        if(err)
        {
            setMessage({ type: "error", content: "Failed to create task." })
            return
        }

        console.log(data)
        setMessage({ type: "success", content: "Task created successfully!" })
        setTimeout(() => router.push('/'), 1000)
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-full max-w-md mx-auto h-full sm:h-auto p-6 bg-gray-100 dark:bg-gray-800 sm:rounded-xl shadow-md">
                <h2 className="font-outfit font-semibold text-3xl text-center text-gray-700 dark:text-neutral-300 mb-4">Create Task</h2>

                {message.content && 
                (
                    <p className={`mb-6 pl-3 h-10 rounded flex justify-center gap-2 items-center ${message.type === 'error' ? 'bg-red-400 text-white' : 'bg-green-500 text-white'}`}>{message.content}</p>
                )}

                <form className="flex flex-col w-full gap-4" onSubmit={handleSubmission}>
                    <label htmlFor="title" className="text-gray-600 dark:text-neutral-400">Title</label>
                    <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task's Title" required className="bg-gray-300 dark:bg-gray-700 dark:text-white/50 w-full p-2 h-10 rounded" />

                    <label htmlFor="description" className="text-gray-600 dark:text-neutral-400">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your task" required className="bg-gray-300 dark:bg-gray-700 dark:text-white/50 w-full p-2 h-24 rounded resize-none" />

                    <button type="submit" className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Create Task</button>
                </form>
            </div>
        </div>
    )
}
