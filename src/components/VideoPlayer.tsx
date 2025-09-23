import { useState, useEffect } from 'react';
import { X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPlayer({ videoId, title, isOpen, onClose }: VideoPlayerProps) {
  // Handle ESC key to close the modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 relative">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold truncate pr-4">{title}</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="relative" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        <div className="p-4 text-center">
          <p className="text-sm text-gray-600">
            Press ESC to close or click the X button above
          </p>
        </div>
      </div>
    </div>
  );
}

interface VideoThumbnailProps {
  videoId: string;
  title: string;
  speaker: string;
  duration: string;
  views: string;
  thumbnail: string;
  onPlay: () => void;
}

export function VideoThumbnail({
  videoId,
  title,
  thumbnail,
  onPlay
}: VideoThumbnailProps) {
  const [imageError, setImageError] = useState(false);
  
  // Enhanced thumbnail URL - try multiple quality options
  const getThumbnailUrl = (id: string) => {
    // Try maxresdefault first, then fall back to high quality
    console.log(imageError);
    return imageError 
      ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
      : thumbnail || `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  };

  return (
    <div className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onPlay}>
      <div className="relative">
        {!imageError ? (
          <img
            src={getThumbnailUrl(videoId)}
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          // Fallback with better styling
          <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-600 rounded-t-lg flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-4xl mb-2">🎥</div>
              <p className="text-sm font-medium">Video Content</p>
              <p className="text-xs opacity-75 mt-1">{title}</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-t-lg hover:bg-opacity-30 transition-colors">
          <Button size="lg" className="rounded-full">
            <Play className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
