import { Button } from "@/components/ui/button"


export const Error = ({ message = "حدث خطأ في تحميل البيانات" }: { message?: string }) => {
    return (
        <div className="flex flex-col items-center justify-center h-64">
            <p className="text-red-500 font-semibold text-xl">{message}</p>
            <Button
                onClick={() => window.location.reload()}
                className="mt-4"
            >حاول مرة اخرى</Button>
        </div>
    )
}
