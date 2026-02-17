export default function Modal({ isOpen, onClose, children })
{
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
            <div className="relative w-full max-w-lg mx-4 flex justify-center items-center flex-col p-6 rounded-xl shadow-lg bg-gray-100 dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
