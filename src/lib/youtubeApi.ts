// YouTube API service for fetching video details
export interface YouTubeVideoDetails {
  id: string;
  title: string;
  description: string;
  channelTitle: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
    standard?: { url: string; width: number; height: number };
    maxres?: { url: string; width: number; height: number };
  };
  publishedAt: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  commentCount?: string;
  tags?: string[];
}

export interface ProcessedVideoData {
  id: string;
  title: string;
  description: string;
  speaker: string;
  duration: string;
  views: string;
  thumbnail: string;
  publishedAt: string;
  tags: string[];
  embedUrl: string;
}

// YouTube API configuration
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Fetch video details from YouTube API
 * @param videoId - The YouTube video ID
 * @returns Promise with video details
 */
export async function fetchYouTubeVideoDetails(videoId: string): Promise<YouTubeVideoDetails | null> {
  try {
    if (!YOUTUBE_API_KEY) {
      console.error('YouTube API key is not configured. Please set NEXT_PUBLIC_GOOGLE_API_KEY in your .env.local file.');
      return null;
    }

    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      console.error(`No video found with ID: ${videoId}`);
      return null;
    }

    const video = data.items[0];
    
    return {
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      channelTitle: video.snippet.channelTitle,
      thumbnails: video.snippet.thumbnails,
      publishedAt: video.snippet.publishedAt,
      duration: video.contentDetails.duration,
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
      commentCount: video.statistics.commentCount,
      tags: video.snippet.tags || [],
    };
  } catch (error) {
    console.error('Error fetching YouTube video details:', error);
    return null;
  }
}

/**
 * Fetch multiple videos at once
 * @param videoIds - Array of YouTube video IDs
 * @returns Promise with array of video details
 */
export async function fetchMultipleYouTubeVideos(videoIds: string[]): Promise<YouTubeVideoDetails[]> {
  try {
    if (!YOUTUBE_API_KEY) {
      console.error('YouTube API key is not configured. Please set NEXT_PUBLIC_GOOGLE_API_KEY in your .env.local file.');
      return [];
    }

    const idsString = videoIds.join(',');
    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/videos?part=snippet,statistics,contentDetails&id=${idsString}&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.items) {
      return [];
    }

    return data.items.map((video: any) => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      channelTitle: video.snippet.channelTitle,
      thumbnails: video.snippet.thumbnails,
      publishedAt: video.snippet.publishedAt,
      duration: video.contentDetails.duration,
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
      commentCount: video.statistics.commentCount,
      tags: video.snippet.tags || [],
    }));
  } catch (error) {
    console.error('Error fetching multiple YouTube videos:', error);
    return [];
  }
}

/**
 * Convert ISO 8601 duration (PT4M13S) to readable format (4:13)
 * @param duration - ISO 8601 duration string
 * @returns Formatted duration string
 */
export function formatDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';

  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Format view count to readable format (45K, 1.2M, etc.)
 * @param viewCount - Raw view count as string
 * @returns Formatted view count
 */
export function formatViewCount(viewCount: string): string {
  const count = parseInt(viewCount);
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${Math.round(count / 1000)}K`;
  }
  return count.toString();
}

/**
 * Process raw YouTube video data into component-friendly format
 * @param videoData - Raw YouTube video details
 * @returns Processed video data for components
 */
export function processVideoData(videoData: YouTubeVideoDetails): ProcessedVideoData {
  // Get the best available thumbnail quality
  const getBestThumbnail = (thumbnails: any) => {
    // Priority: maxres > standard > high > medium > default
    return thumbnails.maxres?.url || 
           thumbnails.standard?.url || 
           thumbnails.high?.url || 
           thumbnails.medium?.url || 
           thumbnails.default?.url ||
           `https://img.youtube.com/vi/${videoData.id}/maxresdefault.jpg`; // Fallback
  };

  return {
    id: videoData.id,
    title: videoData.title,
    description: videoData.description,
    speaker: videoData.channelTitle,
    duration: formatDuration(videoData.duration),
    views: formatViewCount(videoData.viewCount),
    thumbnail: getBestThumbnail(videoData.thumbnails),
    publishedAt: videoData.publishedAt,
    tags: videoData.tags || [],
    embedUrl: `https://www.youtube.com/embed/${videoData.id}`,
  };
}

/**
 * Extract video ID from YouTube URL
 * @param url - YouTube URL
 * @returns Video ID or null if not found
 */
export function extractVideoIdFromUrl(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  // If it's already just an ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }

  return null;
}

// Pre-defined educational video IDs for bonds and finance
export const EDUCATIONAL_VIDEO_IDS = [
  'nMLVn_n1hb8',
  '55ReEsDaZoo',
  'YBg3q-3XscU'
];
