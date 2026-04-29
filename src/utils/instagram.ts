/**
 * Instagram Feed Integration Utilities
 * 
 * This file provides helper functions to fetch and process Instagram data
 * for the FeaturedWorks component.
 */

export interface InstagramPost {
    id: string;
    media_url: string;
    permalink: string;
    caption?: string;
    media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    timestamp: string;
}

export interface InstagramFeedResponse {
    data: InstagramPost[];
    paging?: {
        cursors: {
            before: string;
            after: string;
        };
        next?: string;
    };
}

/**
 * Fetch Instagram feed from Instagram Basic Display API
 * 
 * @param accessToken - Instagram access token
 * @param limit - Number of posts to fetch (default: 6)
 * @returns Array of Instagram posts or null if error
 */
export async function fetchInstagramFeed(
    accessToken: string,
    limit: number = 6
): Promise<InstagramPost[] | null> {
    try {
        const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type,timestamp&limit=${limit}&access_token=${accessToken}`;

        const response = await fetch(url);

        if (!response.ok) {
            console.error('Instagram API error:', response.status, response.statusText);
            return null;
        }

        const data: InstagramFeedResponse = await response.json();

        // Filter to only include images and carousels (no videos)
        return data.data.filter(
            post => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM'
        );
    } catch (error) {
        console.error('Failed to fetch Instagram feed:', error);
        return null;
    }
}

/**
 * Fetch Instagram feed from Instagram Graph API (for business accounts)
 * 
 * @param businessAccountId - Instagram Business Account ID
 * @param accessToken - Facebook access token
 * @param limit - Number of posts to fetch (default: 6)
 * @returns Array of Instagram posts or null if error
 */
export async function fetchInstagramBusinessFeed(
    businessAccountId: string,
    accessToken: string,
    limit: number = 6
): Promise<InstagramPost[] | null> {
    try {
        const url = `https://graph.facebook.com/v18.0/${businessAccountId}/media?fields=id,caption,media_url,permalink,media_type,timestamp&limit=${limit}&access_token=${accessToken}`;

        const response = await fetch(url);

        if (!response.ok) {
            console.error('Instagram Graph API error:', response.status, response.statusText);
            return null;
        }

        const data: InstagramFeedResponse = await response.json();

        // Filter to only include images and carousels (no videos)
        return data.data.filter(
            post => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM'
        );
    } catch (error) {
        console.error('Failed to fetch Instagram business feed:', error);
        return null;
    }
}

/**
 * Extract category from Instagram post caption based on hashtags
 * 
 * @param caption - Instagram post caption
 * @returns Category string
 */
export function extractCategory(caption?: string): string {
    if (!caption) return 'Featured';

    const lowerCaption = caption.toLowerCase();

    if (lowerCaption.includes('#commercial')) return 'Commercial';
    if (lowerCaption.includes('#residential')) return 'Residential';
    if (lowerCaption.includes('#specialty')) return 'Specialty';
    if (lowerCaption.includes('#emergency')) return 'Emergency';

    return 'Featured';
}

/**
 * Extract title from Instagram post caption
 * 
 * @param caption - Instagram post caption
 * @param maxLength - Maximum title length (default: 60)
 * @returns Title string
 */
export function extractTitle(caption?: string, maxLength: number = 60): string {
    if (!caption) return 'Recent Project';

    // Get first line or first sentence
    const firstLine = caption.split('\n')[0].trim();

    // Remove hashtags from title
    const withoutHashtags = firstLine.replace(/#\w+/g, '').trim();

    // Truncate to max length
    if (withoutHashtags.length > maxLength) {
        return withoutHashtags.substring(0, maxLength).trim() + '...';
    }

    return withoutHashtags || 'Recent Project';
}

/**
 * Cache Instagram feed data with expiration
 * 
 * @param key - Cache key
 * @param data - Data to cache
 * @param ttl - Time to live in seconds (default: 3600 = 1 hour)
 */
export function cacheInstagramFeed(
    key: string,
    data: InstagramPost[],
    ttl: number = 3600
): void {
    if (typeof localStorage === 'undefined') return;

    const cacheData = {
        data,
        timestamp: Date.now(),
        ttl: ttl * 1000, // Convert to milliseconds
    };

    try {
        localStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
        console.error('Failed to cache Instagram feed:', error);
    }
}

/**
 * Get cached Instagram feed data if not expired
 * 
 * @param key - Cache key
 * @returns Cached data or null if expired/not found
 */
export function getCachedInstagramFeed(key: string): InstagramPost[] | null {
    if (typeof localStorage === 'undefined') return null;

    try {
        const cached = localStorage.getItem(key);
        if (!cached) return null;

        const cacheData = JSON.parse(cached);
        const now = Date.now();

        // Check if cache is expired
        if (now - cacheData.timestamp > cacheData.ttl) {
            localStorage.removeItem(key);
            return null;
        }

        return cacheData.data;
    } catch (error) {
        console.error('Failed to get cached Instagram feed:', error);
        return null;
    }
}

/**
 * Fetch Instagram feed with caching
 * 
 * @param accessToken - Instagram access token
 * @param cacheKey - Cache key (default: 'instagram_feed')
 * @param limit - Number of posts to fetch (default: 6)
 * @param cacheTTL - Cache time to live in seconds (default: 3600)
 * @returns Array of Instagram posts or null if error
 */
export async function fetchInstagramFeedWithCache(
    accessToken: string,
    cacheKey: string = 'instagram_feed',
    limit: number = 6,
    cacheTTL: number = 3600
): Promise<InstagramPost[] | null> {
    // Try to get from cache first
    const cached = getCachedInstagramFeed(cacheKey);
    if (cached) {
        console.log('Using cached Instagram feed');
        return cached;
    }

    // Fetch fresh data
    console.log('Fetching fresh Instagram feed');
    const feed = await fetchInstagramFeed(accessToken, limit);

    // Cache the result
    if (feed) {
        cacheInstagramFeed(cacheKey, feed, cacheTTL);
    }

    return feed;
}
