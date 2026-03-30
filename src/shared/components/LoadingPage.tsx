import { Spinner } from '@/components/ui/spinner'

const LoadingPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Spinner className="size-10 text-primary" />
        </div>
    )
}

export default LoadingPage