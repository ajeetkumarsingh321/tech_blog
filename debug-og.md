# Open Graph Image Debug Guide

## Current Status ✅

Your Open Graph meta tags are correctly configured. The HTML output shows:

```html
<meta property="og:image" content="https://ajeetkumarsingh.tech/images/Reflecting-01.png" />
```

## Why Social Media Might Still Show Wrong Image

Social media platforms cache Open Graph data aggressively. Even after fixing the meta tags, they may show cached data for hours or days.

## Debugging Steps

### 1. Use Facebook's Sharing Debugger

Visit: https://developers.facebook.com/tools/debug/

- Enter your blog post URL: https://ajeetkumarsingh.tech/blog/reflecting-on-2025-llm-development
- Click "Debug" to see what Facebook sees
- Click "Scrape Again" to force Facebook to re-fetch the data

### 2. Use LinkedIn Post Inspector

Visit: https://www.linkedin.com/post-inspector/

- Enter your blog post URL
- This will show you what LinkedIn sees and force a refresh

### 3. Use Twitter Card Validator

Visit: https://cards-dev.twitter.com/validator

- Enter your blog post URL to see Twitter's view

### 4. Alternative: Add Cache-Busting Parameter

If social platforms still show old data, temporarily add a parameter to your URL when sharing:
`https://ajeetkumarsingh.tech/blog/reflecting-on-2025-llm-development?v=2`

## Image Requirements Check

Your image meets all requirements:

- ✅ Size: Recommended 1200x630px (yours should be close)
- ✅ Format: PNG (supported)
- ✅ Absolute URL: Uses full domain path
- ✅ Accessible: Image exists in /public/images/

## What to Do Next

1. Use the debugging tools above to clear cache
2. Try sharing the link again
3. If still not working, we can modify the Open Graph setup further

## Current Image Path

- File location: `/public/images/Reflecting-01.png`
- URL in meta tag: `https://ajeetkumarsingh.tech/images/Reflecting-01.png`
- This should be accessible at your live site
