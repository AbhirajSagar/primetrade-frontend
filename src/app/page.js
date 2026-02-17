'use client';
import { useEffect, useState } from "react";
import { GetAllTasksService, DeleteTaskService } from "@/services/TaskServices";
import ErrorComponent from "@/components/Error";
import TaskCard from "@/components/TaskCard";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { CirclePlusIcon, CircleQuestionMark, Trash } from "lucide-react";

export default function Home() 
{
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToDelId, setTaskToDelId] = useState(null);
    const [isDeletingStatus, setIsDeletingStatus] = useState(null);
    const router = useRouter();

    async function fetchTasks() 
    {
        try 
        {
            const [data, err] = await GetAllTasksService();
            if(err) throw err;
            setTasks(data?.tasks ?? []);
            console.log(data);
        } 
        catch(e) 
        {
            setError(e);
        }
    }
     
    async function setDeleteTaskId(id)
    {
        setTaskToDelId(id);
        setIsModalOpen(true);
    }

    async function deleteTask()
    {
        const [data, err] = await DeleteTaskService(taskToDelId);
        if(err) 
        {
            setIsDeletingStatus(err.message);
            setTimeout(() => { setIsModalOpen(false); }, 1000);
            return;
        }

        console.log(data);
        setIsDeletingStatus(data.message);
        setTimeout(() => 
        { 
            setIsModalOpen(false); 
            setIsDeletingStatus(null);
            fetchTasks();
        }, 1000);
    }

    useEffect(() => { fetchTasks(); }, []);

    if(error) return <ErrorComponent message={error.message}/>;
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Toolbar createTask={() => router.push('/task/create')}/>
            <div className="w-full p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {
                    tasks.length == 0 
                    ? <NoTasks/>
                    : (tasks.map(TaskObj => <TaskCard key={TaskObj.task.id} setDeleteTaskId={setDeleteTaskId} Task={TaskObj.task}/>))
                }
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {isDeletingStatus ? <p className="dark:text-white">{isDeletingStatus}</p> : <Dialog deleteTask={deleteTask}/>}
            </Modal>
        </div>
    )
}

function NoTasks()
{
    return (
        <div className="col-span-full h-screen flex flex-col justify-center items-center py-12">
            <CircleQuestionMark className="text-4xl text-gray-900 dark:text-white/50" size={65}/>
            <p className="mt-4 text-gray-800 dark:text-white/50">No tasks found</p>
            <p className="dark:text-white/50 text-sm">Create a new task to get started</p>
        </div>
    )
} 

function Toolbar({createTask})
{
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button onClick={createTask} className="px-4 py-3 cursor-pointer dark:text-white flex justify-center items-center gap-2 outline-1 outline-gray-900 dark:bg-gray-800 hover:bg-gray-700 rounded-full shadow-lg transition-all duration-200 hover:scale-105">
                <CirclePlusIcon/>
                <p className="font-medium text-sm">Create Task</p>
            </button>
        </div>
    )
}

function Dialog({deleteTask})
{
    return (
        <>
            <h2 className="dark:text-white/50 text-md font-semibold">Confirmation</h2>
            <p className="dark:text-white text-center text-sm">Are you sure you want to delete this task?</p>
            <button onClick={() => deleteTask()} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                <p className="flex gap-2">
                    <Trash />
                    Delete
                </p>
            </button>
        </>
    )
}