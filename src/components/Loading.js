import { Loader } from "lucide-react";

export default function Loading({message})
{
    return (
        <div className="w-full h-full flex justify-center items-center flex-col">
            <Loader className="animate-spin" />
            <p className="mt-4">{message}</p>
        </div>
    );
}