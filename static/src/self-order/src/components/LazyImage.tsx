import { useState, useRef, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallBack';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  fallback?: string;
  threshold?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export default function LazyImage({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-family="Arial, sans-serif" font-size="14"%3ELoading...%3C/text%3E%3C/svg%3E',
  // fallback = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23fee2e2"/%3E%3Ctext x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%23dc2626" font-family="Arial, sans-serif" font-size="12"%3EImage failed to load%3C/text%3E%3Ctext x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="%23dc2626" font-family="Arial, sans-serif" font-size="10"%3EClick to retry%3C/text%3E%3C/svg%3E',
  threshold = 0.1,
  onLoad,
  onError
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold,
        rootMargin: '50px' // Start loading 50px before the image enters viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    setIsRetrying(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
    setIsRetrying(false);
    onError?.();
  };

  const handleRetry = () => {
    setIsRetrying(true);
    setHasError(false);
    setIsLoaded(false);
    // Force reload by adding a timestamp
    const timestamp = Date.now();
    const newSrc = src.includes('?') ? `${src}&retry=${timestamp}` : `${src}?retry=${timestamp}`;
    
    // Create a new image to test loading
    const testImg = new Image();
    testImg.onload = handleLoad;
    testImg.onerror = handleError;
    testImg.src = newSrc;
  };

  const shouldShowImage = isInView && !hasError;
  const shouldShowPlaceholder = !isInView || (!isLoaded && !hasError && isInView);
  const shouldShowFallback = hasError && !isRetrying;

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder while loading or not in view */}
      {shouldShowPlaceholder && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
          <img
            src={placeholder}
            alt="Loading..."
            className="w-full h-full object-cover opacity-50"
          />
          {isInView && !isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      )}

      {/* Retry loading state */}
      {isRetrying && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
          <div className="text-center">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Retrying...</p>
          </div>
        </div>
      )}

      {/* Error fallback */}
      {shouldShowFallback && (
        <button
          onClick={handleRetry}
          className="absolute inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900 hover:bg-red-100 dark:hover:bg-red-800 transition-colors cursor-pointer group"
        >
          <div className="text-center p-4">
            <div className="w-8 h-8 mx-auto mb-2 text-red-500">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300">
              Failed to load
            </p>
            <p className="text-xs text-red-500 dark:text-red-500 group-hover:text-red-600 dark:group-hover:text-red-400">
              Click to retry
            </p>
          </div>
        </button>
      )}

      {/* Actual image */}
      {shouldShowImage && (
        <ImageWithFallback
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}