'use client';

import { useState } from "react";
import Loading from "@/components/Loading";
import { CircleAlert } from "lucide-react";
import { RegisterService } from "@/services/AuthServices";
import { useRouter } from "next/navigation";

export default function RegisterPage()
{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [message, setMessage] = useState({type: '', content: 'Create Your Account!'})
    const router = useRouter();

    async function handleSubmission(e)
    {
        e.preventDefault();
        setLoadingMessage('Registering your account...');
        setIsLoading(true);

        if(!name) return showError('Missing Name');
        if(!email) return showError('Missing Email');
        if(!validateEmail(email)) return showError('Invalid Email');
        if(!password) return showError('Missing Password');
        if(password.length < 6) return showError('Password too short');

        const [data, error] = await RegisterService(name, email, password, role);
        if(error) return showError(error.message);

        setMessage({type: 'success', content: 'Registration Successful!'});
        setIsLoading(false);
        setTimeout(() => router.push('/'), 1000)
    }

    function showError(error)
    {
        setMessage({type: 'error', content: error});
        console.log(error);
        setIsLoading(false);
        setLoadingMessage('');
    }

    function validateEmail(email)
    {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    if(isLoading) return <Loading message={loadingMessage}/>

    return (
        <>
            <h2 className="font-outfit font-semibold text-3xl text-center dark:text-neutral-300 text-gray-700 mb-2">Register</h2>
            <p className={`mb-6 pl-3 h-10 rounded flex justify-center gap-4 items-center ${message.type == 'error' ? 'bg-red-400' : 'text-gray-500 dark:text-neutral-300'} `}>
                {message.type == 'error' && <CircleAlert/>}
                {message.content}
            </p>
            <form className="flex flex-col w-full gap-3" onSubmit={handleSubmission}>
                <label htmlFor="name" className="text-gray-600 dark:text-neutral-400">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" name="name" required className="bg-gray-300 dark:bg-gray-700 dark:text-white/50 w-full p-2 h-10 rounded" />

                <label htmlFor="email" className="text-gray-600 dark:text-neutral-400">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" name="email" required className="bg-gray-300 dark:bg-gray-700 dark:text-white/50 w-full p-2 h-10 rounded" />

                <label htmlFor="password" className="text-gray-600 dark:text-neutral-400">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" name="password" required className="bg-gray-300 dark:bg-gray-700 dark:text-white/50 w-full p-2 h-10 rounded" />

                <label htmlFor="role" className="text-gray-600 dark:text-neutral-400">Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} id="role" name="role" className="bg-gray-300 dark:bg-gray-700 dark:text-white/50 w-full p-2 h-10 rounded">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit" className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Register</button>
                <a href="/auth/login" className="text-center w-full underline dark:text-white/50">Already have an account? Login</a>
            </form>
        </>
    )
}