# Instagram Integration - Usage Examples

## Quick Start Examples

### Example 1: Basic Static Usage (No Instagram)

```astro
---
// src/pages/index.astro
import FeaturedWorks from "../components/sections/FeaturedWorks.astro";
---

<FeaturedWorks />
```

**Result:** Shows 6 static fallback projects

---

### Example 2: With Instagram Feed (Client-Side)

```astro
---
// src/pages/index.astro
import FeaturedWorks from "../components/sections/FeaturedWorks.astro";

// Fetch Instagram data at build time
const INSTAGRAM_TOKEN = import.meta.env.INSTAGRAM_ACCESS_TOKEN;
const instagramFeed = INSTAGRAM_TOKEN 
  ? await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type,timestamp&access_token=${INSTAGRAM_TOKEN}`)
      .then(res => res.json())
      .then(data => data.data)
      .catch(() => null)
  : null;
---

<FeaturedWorks 
  instagramFeed={instagramFeed}
  instagramUsername="yourcompany"
/>
```

**Result:** Shows latest 6 Instagram posts with "Follow Us on Instagram" button

---

### Example 3: Using Utility Functions

```astro
---
// src/pages/index.astro
import FeaturedWorks from "../components/sections/FeaturedWorks.astro";
import { fetchInstagramFeedWithCache } from "../utils/instagram";

const INSTAGRAM_TOKEN = import.meta.env.INSTAGRAM_ACCESS_TOKEN;
const instagramFeed = INSTAGRAM_TOKEN
  ? await fetchInstagramFeedWithCache(INSTAGRAM_TOKEN, 'home_instagram', 6, 3600)
  : null;
---

<FeaturedWorks 
  instagramFeed={instagramFeed}
  instagramUsername="yourcompany"
/>
```

**Result:** Shows cached Instagram posts (1 hour cache)

---

### Example 4: With Category Filter

```astro
---
// src/pages/commercial.astro
import FeaturedWorks from "../components/sections/FeaturedWorks.astro";
import { fetchInstagramFeedWithCache } from "../utils/instagram";

const INSTAGRAM_TOKEN = import.meta.env.INSTAGRAM_ACCESS_TOKEN;
const instagramFeed = INSTAGRAM_TOKEN
  ? await fetchInstagramFeedWithCache(INSTAGRAM_TOKEN)
  : null;
---

<FeaturedWorks 
  filter="Commercial"
  instagramFeed={instagramFeed}
  instagramUsername="yourcompany"
/>
```

**Result:** Shows only Commercial category posts (from Instagram or static)

---

### Example 5: Using API Route (Recommended)

**Step 1:** Create API route

```typescript
// src/pages/api/instagram.json.ts
import type { APIRoute } from 'astro';
import { fetchInstagramFeed } from '../../utils/instagram';

const INSTAGRAM_TOKEN = import.meta.env.INSTAGRAM_ACCESS_TOKEN;

export const GET: APIRoute = async () => {
  if (!INSTAGRAM_TOKEN) {
    return new Response(JSON.stringify({ error: 'No Instagram token configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const feed = await fetchInstagramFeed(INSTAGRAM_TOKEN, 6);
    
    return new Response(JSON.stringify(feed), {
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

**Step 2:** Use in page

```astro
---
// src/pages/index.astro
import FeaturedWorks from "../components/sections/FeaturedWorks.astro";

const instagramFeed = await fetch(Astro.url.origin + '/api/instagram.json')
  .then(res => res.json())
  .catch(() => null);
---

<FeaturedWorks 
  instagramFeed={instagramFeed}
  instagramUsername="yourcompany"
/>
```

**Result:** Secure server-side Instagram fetching with caching

---

### Example 6: Business Account (Graph API)

```astro
---
// src/pages/index.astro
import FeaturedWorks from "../components/sections/FeaturedWorks.astro";
import { fetchInstagramBusinessFeed } from "../utils/instagram";

const INSTAGRAM_BUSINESS_ID = import.meta.env.INSTAGRAM_BUSINESS_ID;
const FACEBOOK_TOKEN = import.meta.env.FACEBOOK_ACCESS_TOKEN;

const instagramFeed = (INSTAGRAM_BUSINESS_ID && FACEBOOK_TOKEN)
  ? await fetchInstagramBusinessFeed(INSTAGRAM_BUSINESS_ID, FACEBOOK_TOKEN, 6)
  : null;
---

<FeaturedWorks 
  instagramFeed={instagramFeed}
  instagramUsername="yourcompany"
/>
```

**Result:** Shows Instagram Business account posts

---

## Real-World Implementation

### Complete Setup for Production

**1. Environment Variables (.env)**

```env
# Instagram Configuration
INSTAGRAM_ACCESS_TOKEN=your_long_lived_access_token
INSTAGRAM_USERNAME=yourcompany
INSTAGRAM_CACHE_TTL=3600
```

**2. API Route (src/pages/api/instagram.json.ts)**

```typescript
import type { APIRoute } from 'astro';
import { fetchInstagramFeedWithCache } from '../../utils/instagram';

const INSTAGRAM_TOKEN = import.meta.env.INSTAGRAM_ACCESS_TOKEN;
const CACHE_TTL = parseInt(import.meta.env.INSTAGRAM_CACHE_TTL || '3600');

export const GET: APIRoute = async () => {
  if (!INSTAGRAM_TOKEN) {
    return new Response(
      JSON.stringify({ error: 'Instagram not configured' }), 
      { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const feed = await fetchInstagramFeedWithCache(
      INSTAGRAM_TOKEN,
      'instagram_feed',
      6,
      CACHE_TTL
    );
    
    if (!feed) {
      throw new Error('Failed to fetch feed');
    }
    
    return new Response(JSON.stringify(feed), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, max-age=${CACHE_TTL}`,
        'CDN-Cache-Control': `public, max-age=${CACHE_TTL}`,
        'Vercel-CDN-Cache-Control': `public, max-age=${CACHE_TTL}`
      }
    });
  } catch (error) {
    console.error('Instagram API error:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to fetch Instagram feed' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
```

**3. Layout Component (src/layouts/BaseLayout.astro)**

```astro
---
// Fetch Instagram once for all pages
const instagramFeed = await fetch(Astro.url.origin + '/api/instagram.json')
  .then(res => res.ok ? res.json() : null)
  .catch(() => null);

const instagramUsername = import.meta.env.INSTAGRAM_USERNAME;

// Make available to all pages
Astro.locals.instagramFeed = instagramFeed;
Astro.locals.instagramUsername = instagramUsername;
---
```

**4. Page Usage (src/pages/index.astro)**

```astro
---
import FeaturedWorks from "../components/sections/FeaturedWorks.astro";

const instagramFeed = Astro.locals.instagramFeed;
const instagramUsername = Astro.locals.instagramUsername;
---

<FeaturedWorks 
  instagramFeed={instagramFeed}
  instagramUsername={instagramUsername}
/>
```

---

## Instagram Post Best Practices

### Example Post Caption Format

```
✨ New commercial panel upgrade completed! ✨

📍 Downtown Los Angeles
⚡ 400-amp service installation
🔧 3-phase power distribution
✅ Same-day completion
🏢 Zero business downtime

Our team upgraded this office building's electrical system to support modern equipment and future growth. 

#commercial #electrician #panelupgrade #losangeles #businesselectrical #electricalcontractor #commercialelectric
```

**This caption will:**
- Title: "New commercial panel upgrade completed!"
- Category: Commercial (from #commercial hashtag)
- Link: Direct to Instagram post
- Display: Professional project showcase

---

## Troubleshooting Common Issues

### Issue: Instagram feed not showing

**Solution:**
```astro
---
// Add debug logging
const instagramFeed = await fetch('/api/instagram.json')
  .then(res => {
    console.log('Instagram API status:', res.status);
    return res.json();
  })
  .catch(err => {
    console.error('Instagram fetch error:', err);
    return null;
  });

console.log('Instagram feed data:', instagramFeed);
---
```

### Issue: Access token expired

**Solution:**
1. Generate new long-lived token (60 days)
2. Set up token refresh automation
3. Use refresh token endpoint:

```typescript
async function refreshInstagramToken(token: string) {
  const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.access_token;
}
```

### Issue: CORS errors

**Solution:** Use server-side API route (Example 5 above)

---

## Performance Optimization

### 1. Build-Time Fetching (SSG)

```astro
---
// Fetch at build time for static sites
const instagramFeed = await fetchInstagramFeed(INSTAGRAM_TOKEN);
---
```

**Pros:** Fast page loads, no runtime API calls  
**Cons:** Requires rebuild to update

### 2. Server-Side Rendering (SSR)

```astro
---
// Fetch on each request with caching
const instagramFeed = await fetchInstagramFeedWithCache(INSTAGRAM_TOKEN);
---
```

**Pros:** Always fresh data  
**Cons:** Slower initial page load

### 3. Hybrid Approach (Recommended)

```astro
---
// Build-time fetch with client-side refresh
const instagramFeed = await fetchInstagramFeed(INSTAGRAM_TOKEN);
---

<FeaturedWorks instagramFeed={instagramFeed} />

<script>
  // Optional: Refresh feed client-side after page load
  setTimeout(async () => {
    const freshFeed = await fetch('/api/instagram.json').then(r => r.json());
    // Update component with fresh data
  }, 5000);
</script>
```

**Pros:** Fast initial load + fresh data  
**Cons:** More complex implementation

---

## Testing

### Test with Mock Data

```astro
---
const mockInstagramFeed = [
  {
    id: '1',
    media_url: 'https://via.placeholder.com/600',
    permalink: 'https://instagram.com/p/test1',
    caption: 'Test commercial project #commercial',
    media_type: 'IMAGE',
    timestamp: new Date().toISOString()
  },
  // ... more mock posts
];
---

<FeaturedWorks 
  instagramFeed={mockInstagramFeed}
  instagramUsername="testaccount"
/>
```

---

## Next Steps

1. ✅ Set up Instagram API access
2. ✅ Add environment variables
3. ✅ Create API route
4. ✅ Test with mock data
5. ✅ Deploy and verify
6. ✅ Monitor API usage
7. ✅ Set up token refresh automation
