export default function Layout({children})
{
    return (
        <div className="flex flex-col justify-center items-center min-h-screen sm:p-2 dark:bg-gray-900 bg-sky-100">
            <div className="w-full max-w-sm dark:sm:bg-gray-800 sm:bg-gray-100 rounded p-3 md:p-6 sm:max-w-md sm:outline-1 sm:outline-dashed dark:sm:outline-neutral-600 sm:outline-neutral-700/50">
                {children}
            </div>
        </div>
    )
}