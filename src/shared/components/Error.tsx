import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw, Globe } from "lucide-react"
import { motion } from "framer-motion"

interface ErrorProps {
    message?: string;
    error?: any;
}

export const Error = ({ message = "حدث خطأ في تحميل البيانات", error }: ErrorProps) => {

    const apiUrl = error?.config?.url || error?.url;
    const errorMessage = error?.response?.data?.message || error?.message;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[300px] p-8 bg-linear-to-br from-white to-slate-50 rounded-2xl border border-slate-200 shadow-sm"
        >
            <div className="relative mb-6">
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center shadow-inner"
                >
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </motion.div>
                <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                />
            </div>

            <h3 className="text-slate-800 font-bold text-xl mb-2 text-center">{message}</h3>

            {apiUrl && (
                <div className="mt-4 w-full max-w-md bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border-b border-slate-100">
                        <Globe className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Endpoint</span>
                    </div>
                    <div className="p-3 bg-red-50/30">
                        <code className="text-xs text-red-600 font-mono break-all leading-relaxed">
                            {apiUrl}
                        </code>
                    </div>
                </div>
            )}

            {errorMessage && !apiUrl && (
                <p className="text-slate-500 text-sm max-w-sm text-center mb-6 leading-relaxed">
                    {errorMessage}
                </p>
            )}

            <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="mt-8 border-slate-200 hover:bg-slate-50 text-slate-600 px-6 py-5 rounded-xl transition-all flex items-center gap-2 group"
            >
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                <span className="font-semibold">تحديث الصفحة</span>
            </Button>
        </motion.div>
    )
}

