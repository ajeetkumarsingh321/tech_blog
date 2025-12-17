# How to Enable Comments with Giscus

## Prerequisites
1. Your blog repository should be public on GitHub
2. You need to enable GitHub Discussions for your repository

## Setup Steps

### 1. Enable GitHub Discussions
1. Go to your GitHub repository
2. Click on "Settings" tab
3. Scroll down to "Features" section
4. Check the "Discussions" checkbox

### 2. Install Giscus App
1. Visit [giscus.app](https://giscus.app)
2. Scroll to the "Configuration" section
3. Enter your repository name (e.g., `ajeetkumarsingh/blog`)
4. Choose your discussion category (usually "General" or "Comments")
5. Copy the generated configuration

### 3. Configure Environment Variables
1. Open your `.env.local` file
2. Fill in the values from giscus.app:

```bash
NEXT_PUBLIC_GISCUS_REPO=ajeetkumarsingh/blog
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=your-repository-id
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
```

### 4. Enable Comments in Site Metadata
1. Open `data/siteMetadata.js`
2. Change the provider from empty string back to 'giscus':

```javascript
comments: {
  provider: 'giscus', // change from '' to 'giscus'
  // ... rest of config
}
```

### 5. Restart Development Server
```bash
npm run dev
```

## Testing
1. Go to any blog post
2. Scroll to the bottom
3. Click "Load Comments" button
4. Comments should load successfully

## Alternative: Disable Comments
If you don't want comments, keep the provider as an empty string:
```javascript
provider: '', // keeps comments disabled
```
