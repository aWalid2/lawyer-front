export default function ErrorFallback() {
    return (
        <div className="h-screen flex items-center justify-center flex-col gap-4">
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-white rounded"
            >
                Reload
            </button>
        </div>
    );
}