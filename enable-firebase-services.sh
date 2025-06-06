#!/bin/bash

# Firebase Services Enablement Guide
# Run this after manually enabling services in Firebase Console

echo "🔥 Firebase Services Enablement Guide"
echo "======================================"
echo ""

echo "📝 Manual Steps Required:"
echo "1. Open Firebase Console: https://console.firebase.google.com/project/skincare-event-manager"
echo "2. Go to 'Firestore Database' → Click 'Create database'"
echo "3. Choose 'Start in production mode' → Select location (us-central1 recommended)"
echo "4. Go to 'Authentication' → Click 'Get started' → Enable 'Anonymous' provider"
echo "5. Go to 'Hosting' → Click 'Get started' → Follow setup"
echo ""

echo "🔧 After completing manual steps, run:"
echo "firebase deploy --only firestore:rules"
echo "firebase deploy --only firestore:indexes"
echo "npm run build"
echo "npm run deploy"
echo ""

echo "🌐 URLs after deployment:"
echo "• Live App: https://skincare-event-manager.web.app"
echo "• Firebase Console: https://console.firebase.google.com/project/skincare-event-manager"
echo ""

# Test if services are enabled
echo "🔍 Testing Firebase connection..."
firebase firestore:databases:list 2>/dev/null && echo "✅ Firestore is enabled" || echo "❌ Firestore needs to be enabled manually"

echo ""
echo "💡 Tip: Keep this terminal open and run commands one by one after manual setup!"
