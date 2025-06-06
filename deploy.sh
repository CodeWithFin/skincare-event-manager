#!/bin/bash

echo "🚀 Deploying Skincare Event Manager to Vercel"
echo "============================================="

# Check if logged in to Vercel
echo "Checking Vercel authentication..."
if ! vercel whoami > /dev/null 2>&1; then
    echo "❌ Not logged in to Vercel"
    echo "Please run: vercel login"
    echo "This will open a browser window for authentication"
    exit 1
fi

echo "✅ Authenticated with Vercel"

# Build the application
echo "🔨 Building the application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment complete!"
echo "Your app should be available at the URL shown above"
