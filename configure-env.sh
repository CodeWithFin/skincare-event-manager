#!/bin/bash

# Environment Configuration Script
# Run this after getting your Firebase configuration

echo "🔧 Environment Variable Configuration"
echo "====================================="
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists. Creating backup..."
    cp .env.local .env.local.backup
fi

# Copy from example
echo "📄 Creating .env.local from template..."
cp .env.example .env.local

echo ""
echo "✅ Created .env.local file"
echo ""
echo "🔥 Firebase Configuration Required:"
echo "-----------------------------------"
echo ""
echo "Please edit .env.local and replace the following values with your Firebase config:"
echo ""
echo "NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here"
echo "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com"
echo "NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id"
echo "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com"
echo "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id"
echo "NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id"
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000"
echo ""
echo "📝 To edit the file, run:"
echo "   nano .env.local"
echo "   # or"
echo "   code .env.local"
echo ""
echo "✅ After editing, run: npm run dev"
echo "🚀 To deploy, run: npm run deploy"
