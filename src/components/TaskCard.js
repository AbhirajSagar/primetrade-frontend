import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";

export default function TaskCard({ Task, setDeleteTaskId })
{
    const router = useRouter();

    const statusColors = 
    {
        "pending" : "bg-yellow-500",
        "in-progress" : "bg-blue-500",
        "completed" : "bg-green-500"
    };

    const handleEdit = (e) =>
    {
        e.stopPropagation();
        router.push('/task/edit/' + Task.id);
    };

    const handleDelete = (e) =>
    {
        e.stopPropagation();
        setDeleteTaskId(Task.id);
    };

    return (
        <div className="w-full max-w-md p-4 rounded-xl shadow-md transition-shadow duration-200 bg-gray-100 dark:bg-gray-800 hover:shadow-lg cursor-pointer hover:translate-y-1 transition-transform">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="font-outfit font-semibold text-xl text-gray-700 dark:text-neutral-300">{Task.title}</h2>
                    <p className="text-gray-500 dark:text-neutral-400 text-sm">
                        {new Date(Task.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={handleEdit} className="p-2 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
                        <Edit size={18} className="dark:text-white/70"/>
                    </button>
                    <button onClick={handleDelete} className="p-2 rounded-full cursor-pointer hover:bg-red-200 dark:hover:bg-red-700">
                        <Trash2 size={18} className="dark:text-white/70"/>
                    </button>
                    <span className={`p-2 text-xs font-medium text-white rounded-full ${statusColors[Task.status]}`}>
                        {Task.status.toUpperCase()}
                    </span>
                </div>
            </div>

            <p className="my-3 text-gray-700 dark:text-gray-300">{Task.description}</p>

            <div className="flex items-center mt-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-800 dark:text-white font-medium">
                    {Task.user.name.charAt(0).toUpperCase()}
                </div>
                <p className="ml-3 text-gray-800 dark:text-white">{Task.user.name} ({Task.user.role})</p>
            </div>
        </div>
    );
}