import {
  Clock,
  WifiOff,
  AlertTriangle,
  RefreshCw,
  Wifi,
} from "lucide-react";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";

type LoadingState = "loading" | "success" | "error" | "timeout" | "offline";

interface ErrorStateProps {
  state: LoadingState;
  onRetry: () => void;
  retryCount: number;
  isOnline: boolean;
}

export default function ErrorState({ state, onRetry, retryCount, isOnline }: ErrorStateProps) {
  const getErrorContent = () => {
    switch (state) {
      case "timeout":
        return {
          icon: <Clock className="w-12 h-12 text-yellow-500" />,
          title: "Loading Taking Too Long",
          message:
            "The app is taking longer than expected to load. This might be due to a slow connection.",
        };
      case "offline":
        return {
          icon: <WifiOff className="w-12 h-12 text-red-500" />,
          title: "You're Offline",
          message: isOnline
            ? "Connection restored! You can retry now."
            : "Please check your internet connection and try again.",
        };
      case "error":
      default:
        return {
          icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
          title: "Something Went Wrong",
          message:
            "We encountered an error while loading the app. Please try again.",
        };
    }
  };

  const { icon, title, message } = getErrorContent();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-6">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <Alert className="mb-6 max-w-md">
        <AlertDescription>
          {message}
          {retryCount > 0 && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Retry attempts: {retryCount}
            </div>
          )}
        </AlertDescription>
      </Alert>
      <div className="space-y-3">
        <Button
          onClick={onRetry}
          disabled={state === "offline" && !isOnline}
          className="bg-[#84482b] hover:bg-[#6d3a23] text-white px-6 py-2 rounded-xl flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>
            {state === "offline" && !isOnline
              ? "Waiting for Connection"
              : "Try Again"}
          </span>
        </Button>
        {state === "offline" && (
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            {isOnline ? (
              <>
                <Wifi className="w-4 h-4 text-green-500" />
                <span>Connection restored!</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4" />
                <span>No internet connection</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}