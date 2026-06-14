import type { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const err = error as any;
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 p-4 text-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold text-gray-900">حدث خطأ ما</h1>
        <p className="max-w-md text-gray-500">
          نعتذر، يبدو أن هناك مشكلة فنية حدثت. يرجى المحاولة مرة أخرى أو التواصل
          مع الدعم الفني.
        </p>
      </div>

      {err?.config?.url && (
        <div className="w-full max-w-lg rounded-xl border border-red-100 bg-red-50 p-4 shadow-sm">
          <p className="mb-2 flex items-center justify-center gap-2 text-sm font-semibold text-red-800">
            <span>فشل الاتصال بـ:</span>
          </p>
          <div className="overflow-x-auto rounded bg-white/50 p-2 text-left">
            <code className="font-mono text-xs break-all whitespace-pre-wrap text-red-600">
              {err.config.url}
            </code>
          </div>
        </div>
      )}

      <button
        onClick={() =>
          resetErrorBoundary ? resetErrorBoundary() : window.location.reload()
        }
        className="bg-primary shadow-primary/20 hover:shadow-primary/30 rounded-full px-8 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl active:scale-95"
      >
        إعادة المحاولة
      </button>

      {/* {!err?.config?.url && err?.message && (
                <details className="mt-4 text-xs text-gray-400 cursor-pointer">
                    <summary className="hover:text-gray-600 transition-colors">تفاصيل الخطأ</summary>
                    <p className="mt-2 font-mono bg-gray-50 p-2 rounded">{err.message}</p>
                </details>
            )} */}
    </div>
  );
}
