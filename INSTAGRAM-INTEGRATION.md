# Instagram Feed Integration Guide

This guide explains how to connect the FeaturedWorks component to your company's Instagram account.

## Overview

The `FeaturedWorks.astro` component now supports dynamic Instagram feed integration while maintaining fallback to static content when Instagram data is unavailable.

## Features

✅ **Automatic Instagram Feed Display** - Shows latest 6 posts from your Instagram  
✅ **Smart Category Detection** - Automatically categorizes posts based on hashtags  
✅ **Fallback Content** - Uses static projects when Instagram feed is unavailable  
✅ **External Links** - Instagram posts link directly to Instagram  
✅ **Responsive Grid** - Instagram-style square grid layout  
✅ **Loading Optimization** - Lazy loading for images

## Setup Options

### Option 1: Instagram Basic Display API (Recommended for Simple Use)

1. **Create Facebook App**
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create a new app
   - Add "Instagram Basic Display" product

2. **Configure Instagram Basic Display**
   - Add Instagram test users
   - Generate access token
   - Note: Tokens expire every 60 days

3. **Fetch Instagram Data**
   ```javascript
   // Example API endpoint
   const INSTAGRAM_API = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type,timestamp&access_token=${ACCESS_TOKEN}`;
   ```

### Option 2: Instagram Graph API (For Business Accounts)

1. **Requirements**
   - Instagram Business or Creator account
   - Facebook Page connected to Instagram
   - Facebook App with Instagram Graph API

2. **Fetch Data**
   ```javascript
   const INSTAGRAM_GRAPH_API = `https://graph.facebook.com/v18.0/${INSTAGRAM_BUSINESS_ID}/media?fields=id,caption,media_url,permalink,media_type,timestamp&access_token=${ACCESS_TOKEN}`;
   ```

### Option 3: Third-Party Services (Easiest)

Use services that handle Instagram API complexity:
- **Juicer.io** - Instagram feed aggregator
- **SnapWidget** - Instagram feed widget
- **Flockler** - Social media aggregator
- **EmbedSocial** - Instagram feed embedder

## Implementation

### Basic Usage (Static Content)

```astro
---
import FeaturedWorks from "../components/sections/FeaturedWorks.astro";
---

<FeaturedWorks />
```

### With Instagram Feed

```astro
---
import FeaturedWorks from "../components/sections/FeaturedWorks.astro";

// Fetch Instagram data (example)
const instagramData = await fetch(INSTAGRAM_API_URL)
  .then(res => res.json())
  .then(data => data.data)
  .catch(() => null);
---

<FeaturedWorks 
  instagramFeed={instagramData}
  instagramUsername="yourcompany"
/>
```

### With Category Filter

```astro
<FeaturedWorks 
  filter="Commercial"
  instagramFeed={instagramData}
  instagramUsername="yourcompany"
/>
```

## Instagram Post Format

### Hashtag-Based Categorization

The component automatically detects categories from hashtags in your Instagram captions:

- `#commercial` → Commercial category
- `#residential` → Residential category  
- `#specialty` → Specialty category
- `#emergency` → Emergency category

**Example Instagram Caption:**
```
Just completed a major panel upgrade for a local business! 
⚡ 200-amp service installation
🔧 Same-day completion
✅ Code compliant

#commercial #electrician #panelupgrade #businesselectrical
```

### Best Practices for Instagram Posts

1. **Use Relevant Hashtags**
   - Include category hashtags (#commercial, #residential, etc.)
   - Add service-specific hashtags
   - Use location hashtags for local SEO

2. **Write Descriptive Captions**
   - First line becomes the project title (keep under 60 characters)
   - Include project details
   - Add emojis for visual appeal

3. **Post Quality Images**
   - Square format (1:1 ratio) works best
   - High resolution (at least 1080x1080px)
   - Show completed work, not in-progress

4. **Consistent Posting**
   - Post regularly to keep feed fresh
   - Aim for 2-3 posts per week
   - Mix project types for variety

## Server-Side Integration Example

### Using Astro API Routes

Create `src/pages/api/instagram.json.ts`:

```typescript
import type { APIRoute } from 'astro';

const INSTAGRAM_TOKEN = import.meta.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_API = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type,timestamp&access_token=${INSTAGRAM_TOKEN}`;

export const GET: APIRoute = async () => {
  try {
    const response = await fetch(INSTAGRAM_API);
    const data = await response.json();
    
    return new Response(JSON.stringify(data.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch Instagram feed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
```

Then use it in your page:

```astro
---
const instagramFeed = await fetch('/api/instagram.json')
  .then(res => res.json())
  .catch(() => null);
---

<FeaturedWorks 
  instagramFeed={instagramFeed}
  instagramUsername="yourcompany"
/>
```

## Environment Variables

Add to `.env`:

```env
# Instagram API Configuration
INSTAGRAM_ACCESS_TOKEN=your_access_token_here
INSTAGRAM_BUSINESS_ID=your_business_id_here
INSTAGRAM_USERNAME=yourcompany
```

Add to `.env.example`:

```env
# Instagram API Configuration
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_BUSINESS_ID=
INSTAGRAM_USERNAME=
```

## Caching Strategy

To avoid hitting API rate limits:

1. **Cache API responses** (1-4 hours)
2. **Use build-time data** for static sites
3. **Implement fallback** to static content
4. **Store in database** for dynamic sites

## Component Props

### `instagramFeed` (optional)
Array of Instagram posts with structure:
```typescript
{
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  media_type: string; // 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  timestamp: string;
}
```

### `instagramUsername` (optional)
Your Instagram username (without @). Used for:
- Display in header text
- "Follow Us" button link

### `filter` (optional)
Filter projects by category:
- `"Commercial"`
- `"Residential"`
- `"Specialty"`
- `"Emergency"`

## Troubleshooting

### Instagram Feed Not Showing

1. **Check API Token**
   - Verify token is valid and not expired
   - Regenerate token if needed

2. **Check API Response**
   - Log the API response to console
   - Verify data structure matches expected format

3. **Check Media Type**
   - Component only shows IMAGE and CAROUSEL_ALBUM posts
   - VIDEO posts are filtered out

4. **Check Fallback**
   - Static content should show if Instagram fails
   - Verify static projects array is populated

### Categories Not Detected

1. **Check Hashtags**
   - Ensure hashtags are lowercase in captions
   - Use exact hashtags: #commercial, #residential, etc.

2. **Check Caption Format**
   - Caption should be a string
   - Hashtags should be in the caption text

### Images Not Loading

1. **Check CORS**
   - Instagram images should load without CORS issues
   - If issues persist, consider proxying images

2. **Check Image URLs**
   - Verify `media_url` is valid
   - Check for HTTPS URLs

## Security Notes

⚠️ **Never expose access tokens in client-side code**  
✅ Use server-side API routes  
✅ Store tokens in environment variables  
✅ Implement rate limiting  
✅ Cache responses to reduce API calls

## Support

For Instagram API issues:
- [Instagram Basic Display API Docs](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Instagram Graph API Docs](https://developers.facebook.com/docs/instagram-api)

For component issues:
- Check component props are correctly passed
- Verify data structure matches expected format
- Review browser console for errors
