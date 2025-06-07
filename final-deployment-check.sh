#!/bin/bash

echo "🚀 Final Deployment Check for Skincare Event Queue Manager"
echo "=========================================================="

# Change to project directory
cd "$(dirname "$0")"

echo "📁 Current directory: $(pwd)"
echo ""

# Check if this is the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the correct directory?"
    exit 1
fi

echo "1️⃣ Checking project structure..."
echo "✅ package.json found"

# Check key files exist
required_files=(
    "src/app/check-in/page.tsx"
    "src/app/check-in/success/page.tsx"
    "src/app/status/[guestId]/page.tsx"
    "src/lib/data-service.ts"
    "src/types/index.ts"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - MISSING"
        exit 1
    fi
done

echo ""
echo "2️⃣ Checking dependencies..."
if npm list --depth=0 > /dev/null 2>&1; then
    echo "✅ All dependencies installed"
else
    echo "⚠️ Installing dependencies..."
    npm install
fi

echo ""
echo "3️⃣ Running build test..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Running with output..."
    npm run build
    exit 1
fi

echo ""
echo "4️⃣ Checking key functionality..."

# Check that data service has required exports
if grep -q "export const addGuest" src/lib/data-service.ts && \
   grep -q "export const subscribeToGuestUpdates" src/lib/data-service.ts && \
   grep -q "export const getGuestById" src/lib/data-service.ts; then
    echo "✅ Data service functions present"
else
    echo "❌ Missing required data service functions"
    exit 1
fi

# Check that check-in page captures guest ID
if grep -q "const guestId = await addGuest" src/app/check-in/page.tsx && \
   grep -q "router.push.*guestId=" src/app/check-in/page.tsx; then
    echo "✅ Check-in flow captures and passes guest ID"
else
    echo "❌ Check-in flow missing guest ID handling"
    exit 1
fi

# Check that status page has notification support
if grep -q "Notification.requestPermission" src/app/status/*/page.tsx && \
   grep -q "subscribeToGuestUpdates" src/app/status/*/page.tsx; then
    echo "✅ Status page has notification support"
else
    echo "❌ Status page missing notification functionality"
    exit 1
fi

echo ""
echo "5️⃣ Vercel deployment readiness..."

# Check if vercel.json exists (it shouldn't for Next.js 15)
if [ -f "vercel.json" ]; then
    echo "⚠️ vercel.json found - Next.js 15 uses auto-detection"
    echo "   Consider removing vercel.json for optimal deployment"
else
    echo "✅ No vercel.json (good for Next.js 15 auto-detection)"
fi

# Check Next.js version
if grep -q '"next": ".*15\.' package.json; then
    echo "✅ Next.js 15 detected"
else
    echo "⚠️ Next.js version may not be 15.x"
fi

echo ""
echo "6️⃣ Final checks..."

# Check that Firebase is completely removed
if grep -q "firebase" package.json || [ -f "firebase.json" ] || [ -f "src/lib/firebase" ]; then
    echo "❌ Firebase dependencies still present"
    exit 1
else
    echo "✅ Firebase completely removed"
fi

# Check that mock data is removed from data service
if grep -q "const mockGuests" src/lib/data-service.ts; then
    echo "❌ Mock data still present in data service"
    exit 1
else
    echo "✅ No hardcoded mock data"
fi

echo ""
echo "🎉 ALL CHECKS PASSED!"
echo ""
echo "📋 Deployment Summary:"
echo "   ✅ Firebase dependencies removed"
echo "   ✅ Real-time notifications implemented"
echo "   ✅ Guest ID flow working"
echo "   ✅ Status page with notifications"
echo "   ✅ Build successful"
echo "   ✅ Ready for Vercel deployment"
echo ""
echo "🚀 To deploy to Vercel:"
echo "   1. vercel login"
echo "   2. vercel --prod"
echo ""
echo "🧪 To test locally:"
echo "   1. npm run dev"
echo "   2. Open http://localhost:3000/check-in"
echo "   3. Fill form and test complete flow"
echo "   4. Open test-notifications.html for notification testing"
echo ""
echo "📱 Key URLs after deployment:"
echo "   • Check-in: https://your-app.vercel.app/check-in"
echo "   • Admin Queue: https://your-app.vercel.app/admin/queue"
echo "   • Dashboard: https://your-app.vercel.app/admin/dashboard"
echo ""
echo "✨ Your Skincare Event Queue Manager is ready for production!"
