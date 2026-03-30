

export const EmptyTable = ({ message = "لا توجد بيانات" }: { message?: string }) => {
    return (
        <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-xl">{message}</p>
        </div>
    )
}
