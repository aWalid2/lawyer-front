import type { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    const err = error as any;
    return (
        <div className="h-screen flex items-center justify-center flex-col gap-6 p-4 text-center">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-3xl font-bold text-gray-900">حدث خطأ ما</h1>
                <p className="text-gray-500 max-w-md">نعتذر، يبدو أن هناك مشكلة فنية حدثت. يرجى المحاولة مرة أخرى أو التواصل مع الدعم الفني.</p>
            </div>

            {err?.config?.url && (
                <div className="w-full max-w-lg bg-red-50 border border-red-100 rounded-xl p-4 shadow-sm">
                    <p className="text-red-800 text-sm font-semibold mb-2 flex items-center justify-center gap-2">
                        <span>فشل الاتصال بـ:</span>
                    </p>
                    <div className="bg-white/50 rounded p-2 text-left overflow-x-auto">
                        <code className="text-xs text-red-600 font-mono break-all whitespace-pre-wrap">
                            {err.config.url}
                        </code>
                    </div>
                </div>
            )}

            <button
                onClick={() => resetErrorBoundary ? resetErrorBoundary() : window.location.reload()}
                className="px-8 py-3 bg-primary text-white rounded-full font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95"
            >
                إعادة المحاولة
            </button>
            
            {!err?.config?.url && err?.message && (
                <details className="mt-4 text-xs text-gray-400 cursor-pointer">
                    <summary className="hover:text-gray-600 transition-colors">تفاصيل الخطأ</summary>
                    <p className="mt-2 font-mono bg-gray-50 p-2 rounded">{err.message}</p>
                </details>
            )}
        </div>
    );
}
