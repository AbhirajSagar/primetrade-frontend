"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { GetTaskByIdService, UpdateTaskService } from "@/services/TaskServices"

export default function TaskPage() 
{
    const params = useParams()
    const router = useRouter();
    const id = params.id

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("pending")
    const [message, setMessage] = useState({ type: "", content: "" })

    useEffect(() => 
    {
        let isMounted = true
        
        async function loadData()
        {
            const [data, err] = await GetTaskByIdService(id)
            if(!isMounted) return
            
            if(err) 
            {
                setMessage({ type: "error", content: "Failed to fetch task data." })
                return
            }
            
            console.log(data)
            setTitle(data.task.title || "")
            setDescription(data.task.description || "")
            setStatus(data.task.status || "pending")
        }
        
        loadData()
        
        return () => { isMounted = false }
    }, [id]);

    async function handleSubmission(e)
    {
        e.preventDefault()
        if(!title || !description)
        {
            setMessage({ type: "error", content: "All fields are required!" })
            return
        }

        const [data, err] = await UpdateTaskService(id, { title, description, status })
        if(err) 
        {
            setMessage({ type: "error", content: "Failed to update task." })
            return
        }

        console.log(data);
        setMessage({ type: "success", content: "Task updated successfully!" })
        setTimeout(() => router.push('/'),1000)
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-full max-w-md mx-auto h-full sm:h-auto p-6 bg-gray-100 dark:bg-gray-800 sm:rounded-xl shadow-md">
                <h2 className="font-outfit font-semibold text-3xl text-center text-gray-700 dark:text-neutral-300 mb-4">
                    Edit Task
                </h2>

                {message.content && (
                    <p className={`mb-6 pl-3 h-10 rounded flex justify-center gap-2 items-center
                        ${message.type === 'error' ? 'bg-red-400 text-white' : 'bg-green-500 text-white'}`}>
                        {message.content}
                    </p>
                )}

                <form className="flex flex-col w-full gap-4" onSubmit={handleSubmission}>
                    <label htmlFor="title" className="text-gray-600 dark:text-neutral-400">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="bg-gray-300 dark:bg-gray-700 dark:text-white/50 w-full p-2 h-10 rounded"
                    />

                    <label htmlFor="description" className="text-gray-600 dark:text-neutral-400">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="bg-gray-300 dark:bg-gray-700 dark:text-white/50 w-full p-2 h-24 rounded resize-none"
                    />

                    <label htmlFor="status" className="text-gray-600 dark:text-neutral-400">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="bg-gray-300 dark:bg-gray-700 dark:text-white/50 w-full p-2 h-10 rounded"
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                    <button
                        type="submit"
                        className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Save Task
                    </button>
                </form>
            </div>
        </div>
    )
}