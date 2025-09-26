/**
 * Reusable loading spinner component
 */
interface LoadingSpinnerProps {
	size?: "sm" | "md" | "lg";
	className?: string;
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
	const sizeClasses = {
		sm: "h-3 w-3 border-2",
		md: "h-4 w-4 border-2",
		lg: "h-6 w-6 border-3",
	};

	return (
		<div
			className={`${sizeClasses[size]} border-white border-t-transparent rounded-full animate-spin ${className}`}
		/>
	);
}
