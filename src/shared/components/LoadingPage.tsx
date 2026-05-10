import { Spinner } from "@/components/ui/spinner";

interface LoadingPageProps {
  fullScreen?: boolean;
}

const LoadingPage = ({ fullScreen = true }: LoadingPageProps) => {
  return (
    <div
      className={`flex items-center justify-center ${fullScreen ? "h-screen" : "h-full min-h-[240px] w-full"}`}
    >
      <Spinner className="text-primary size-10" />
    </div>
  );
};

export default LoadingPage;
