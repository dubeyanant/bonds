import * as React from "react"
import { cn } from "@/lib/utils"

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode
}

export function ImageWithFallback({ 
  src, 
  alt, 
  className, 
  fallback, 
  ...props 
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = React.useState(false)

  const handleError = () => {
    setHasError(true)
  }

  if (hasError && fallback) {
    return <>{fallback}</>
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn(className)}
      onError={handleError}
      {...props}
    />
  )
}
