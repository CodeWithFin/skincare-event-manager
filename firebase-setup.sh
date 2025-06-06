#!/bin/bash

# Firebase Setup Script for Skincare Event Queue Manager
# This script will guide you through the Firebase configuration process

echo "🔥 Firebase Configuration Guide"
echo "================================"
echo ""

echo "Step 1: Create Firebase Project"
echo "------------------------------"
echo "1. Open https://console.firebase.google.com/ in your browser"
echo "2. Click 'Add project' or 'Create a project'"
echo "3. Enter project name: 'skincare-event-manager' (or your preferred name)"
echo "4. Enable/disable Google Analytics as needed"
echo "5. Click 'Create project'"
echo ""

echo "Step 2: Set up Firestore Database"
echo "--------------------------------"
echo "1. In your Firebase project, click 'Firestore Database'"
echo "2. Click 'Create database'"
echo "3. Choose 'Start in test mode' (we'll deploy security rules later)"
echo "4. Select a location close to your users"
echo "5. Click 'Done'"
echo ""

echo "Step 3: Get Web App Configuration"
echo "--------------------------------"
echo "1. In project overview, click the web icon '</>' "
echo "2. Enter app nickname: 'event-manager-web'"
echo "3. Don't check 'Firebase Hosting' (we'll set this up separately)"
echo "4. Click 'Register app'"
echo "5. Copy the firebaseConfig object that appears"
echo ""

echo "Step 4: Configure Environment Variables"
echo "-------------------------------------"
echo "After getting your Firebase config, run:"
echo "  ./configure-env.sh"
echo ""

echo "Step 5: Deploy to Firebase"
echo "-------------------------"
echo "After configuration, run:"
echo "  npm run deploy"
echo ""

echo "📋 Need help? Check DEPLOYMENT.md for detailed instructions!"
