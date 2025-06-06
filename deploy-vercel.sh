#!/bin/bash

echo "🚀 Deploying Skincare Event Manager to Vercel (Firebase-Free)"
echo "============================================================="

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

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📋 What you now have:"
echo "✅ Firebase completely removed"
echo "✅ Mock data service for development"
echo "✅ Clean Vercel deployment"
echo "✅ Mobile-responsive UI"
echo ""
echo "⚠️  Next steps:"
echo "1. Add real backend (Supabase recommended)"
echo "2. Add authentication"
echo "3. Add SMS notifications (Twilio)"
echo ""
echo "Your app should be available at the URL shown above!"
