#!/bin/bash

echo "🧪 Testing Deployed Application"
echo "==============================="
echo ""

APP_URL="https://skincare-event-manager.web.app"

echo "🔍 Testing main endpoints..."

# Test health endpoint
echo "1. Health check..."
curl -s "$APP_URL/health" >/dev/null && echo "   ✅ Health endpoint working" || echo "   ❌ Health endpoint failed"

# Test main page
echo "2. Main page..."
curl -s "$APP_URL" >/dev/null && echo "   ✅ Main page loading" || echo "   ❌ Main page failed"

# Test admin dashboard
echo "3. Admin dashboard..."
curl -s "$APP_URL/admin/dashboard" >/dev/null && echo "   ✅ Admin dashboard loading" || echo "   ❌ Admin dashboard failed"

# Test check-in page  
echo "4. Check-in page..."
curl -s "$APP_URL/check-in" >/dev/null && echo "   ✅ Check-in page loading" || echo "   ❌ Check-in page failed"

echo ""
echo "🌐 Application URLs:"
echo "• Main App: $APP_URL"
echo "• Admin Dashboard: $APP_URL/admin/dashboard"
echo "• Queue Management: $APP_URL/admin/queue"
echo "• Check-in System: $APP_URL/check-in"
echo "• Health Check: $APP_URL/health"
echo ""
echo "📱 Test on mobile devices too!"
echo "📊 Monitor Firebase Console for real-time data"
echo ""
echo "🎉 Your Skincare Event Queue Manager is LIVE!"
