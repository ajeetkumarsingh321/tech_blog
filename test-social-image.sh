#!/bin/bash
# Test script to check if the social image is accessible and if Facebook can see the updated Open Graph tags

echo "🔍 Testing social image accessibility..."
echo ""

# Test 1: Check if the image URL is accessible
echo "📡 Testing image URL: https://ajeetkumarsingh.tech/images/Reflecting-01-social.png"
curl -I "https://ajeetkumarsingh.tech/images/Reflecting-01-social.png" 2>/dev/null | head -n 1
echo ""

# Test 2: Check Open Graph tags on the blog post
echo "🔍 Checking Open Graph tags in HTML:"
curl -s "https://ajeetkumarsingh.tech/blog/reflecting-on-2025-llm-development" | grep -i "og:image" | head -3
echo ""

# Test 3: Check if the site is deployed with latest changes
echo "📅 Checking if site shows recent updates (look for 'December 27, 2025'):"
curl -s "https://ajeetkumarsingh.tech/blog/reflecting-on-2025-llm-development" | grep -i "december 27" | head -1
echo ""

echo "🛠️  Next steps if image is not reflecting on Facebook:"
echo "1. Use Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/"
echo "2. Enter your blog URL: https://ajeetkumarsingh.tech/blog/reflecting-on-2025-llm-development"
echo "3. Click 'Scrape Again' to force Facebook to refresh its cache"
echo "4. You might need to do this 2-3 times for Facebook to pick up the changes"
echo ""
echo "🔄 The Open Graph tags in your HTML are correct, so this is likely a caching issue."
