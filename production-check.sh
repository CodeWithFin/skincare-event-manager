#!/bin/bash

# Production Readiness Check Script
# Run this before deploying to production

echo "🔍 Checking Skincare Event Queue Manager Production Readiness..."
echo ""

# Check if required files exist
echo "📁 Checking project structure..."
required_files=("package.json" "next.config.ts" "tsconfig.json")

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file found"
    else
        echo "❌ Missing $file file"
        exit 1
    fi
done

# Check source structure
echo ""
echo "📂 Checking source structure..."
if [ -d "src/app" ]; then
    echo "✅ Next.js app directory found"
else
    echo "❌ Missing src/app directory"
    exit 1
fi

if [ -f "src/lib/data-service.ts" ]; then
    echo "✅ Data service found"
else
    echo "❌ Missing data service"
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

# Check for Vercel configuration
echo ""
echo "🚀 Checking deployment configuration..."
if [ -f "vercel.json" ]; then
    echo "✅ Vercel configuration found"
else
    echo "ℹ️  No vercel.json found - using default Vercel settings"
fi

# Check package.json scripts
echo ""
echo "📝 Checking npm scripts..."
if npm run --silent lint > /dev/null 2>&1; then
    echo "✅ Linting passed"
else
    echo "⚠️  Warning: Linting issues found - run npm run lint to fix"
fi

echo ""
echo "🎉 Production readiness check complete!"
echo ""
echo "Your app is ready for deployment! Next steps:"
echo "1. Deploy to Vercel: vercel"
echo "2. Or push to GitHub and connect to Vercel"
echo "3. Test the deployed application"
echo ""
echo "✨ Your Skincare Event Queue Manager is production-ready!"
