#!/bin/bash

echo "🚀 Automated Firebase Deployment Script"
echo "======================================="
echo ""

# Check if Firebase project is set
echo "📋 Checking Firebase project..."
firebase use --current

# Build the application
echo "🔨 Building application..."
npm run build

# Deploy to Firebase Hosting
echo "🌐 Deploying to Firebase Hosting..."
firebase deploy --only hosting --non-interactive

# Check deployment status
if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 DEPLOYMENT SUCCESSFUL!"
    echo "================================"
    echo "🌐 Your app is live at:"
    echo "   https://skincare-event-manager.web.app"
    echo "   https://skincare-event-manager.firebaseapp.com"
    echo ""
    echo "📱 Admin Dashboard:"
    echo "   https://skincare-event-manager.web.app/admin/dashboard"
    echo ""
    echo "📝 Check-in System:"
    echo "   https://skincare-event-manager.web.app/check-in"
    echo ""
    echo "🏥 Health Check:"
    echo "   https://skincare-event-manager.web.app/health"
    echo ""
    echo "🎊 Congratulations! Your Skincare Event Queue Manager is now LIVE!"
else
    echo ""
    echo "❌ Deployment failed. Please check the error messages above."
    echo "💡 Try enabling Firebase services manually:"
    echo "   1. Go to https://console.firebase.google.com/project/skincare-event-manager"
    echo "   2. Enable Firestore Database"
    echo "   3. Enable Authentication (Anonymous)"
    echo "   4. Enable Hosting"
    echo "   5. Re-run this script"
fi
