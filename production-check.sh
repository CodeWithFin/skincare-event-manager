#!/bin/bash

# Production Readiness Check Script
# Run this before deploying to production

echo "🔍 Checking Skincare Event Queue Manager Production Readiness..."
echo ""

# Check if required files exist
echo "📁 Checking project structure..."
if [ -f ".env.example" ]; then
    echo "✅ Environment template found"
else
    echo "❌ Missing .env.example file"
    exit 1
fi

if [ -f "firebase.json" ]; then
    echo "✅ Firebase configuration found"
else
    echo "❌ Missing firebase.json file"
    exit 1
fi

if [ -f "firestore.rules" ]; then
    echo "✅ Firestore rules found"
else
    echo "❌ Missing firestore.rules file"
    exit 1
fi

# Check if .env.local exists
echo ""
echo "🔧 Checking environment configuration..."
if [ -f ".env.local" ]; then
    echo "✅ Local environment file found"
    if grep -q "your-api-key" .env.local; then
        echo "⚠️  Warning: Please update Firebase credentials in .env.local"
    else
        echo "✅ Environment appears configured"
    fi
else
    echo "❌ Missing .env.local file - please copy from .env.example and configure"
    exit 1
fi

# Test build
echo ""
echo "🏗️  Testing production build..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build successful"
else
    echo "❌ Build failed - check npm run build for details"
    exit 1
fi

# Check Firebase CLI
echo ""
echo "🔥 Checking Firebase CLI..."
if command -v firebase &> /dev/null; then
    echo "✅ Firebase CLI is installed"
    if firebase projects:list > /dev/null 2>&1; then
        echo "✅ Firebase authentication successful"
    else
        echo "⚠️  Please run: firebase login"
    fi
else
    echo "❌ Firebase CLI not found - run: npm install -g firebase-tools"
fi

echo ""
echo "🎉 Production readiness check complete!"
echo ""
echo "Next steps:"
echo "1. Configure Firebase project: npm run firebase:init"
echo "2. Deploy application: npm run deploy"
echo "3. Test the deployed application"
echo ""
