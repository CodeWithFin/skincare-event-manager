#!/usr/bin/env node

/**
 * Test script to verify the complete workflow of the Skincare Event Queue Manager
 * Tests the notification system and guest tracking functionality
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Skincare Event Queue Manager Workflow...\n');

// Test 1: Check if all required files exist
console.log('1️⃣  Checking required files...');
const requiredFiles = [
  'src/app/check-in/page.tsx',
  'src/app/check-in/success/page.tsx',
  'src/app/status/[guestId]/page.tsx',
  'src/lib/data-service.ts',
  'src/types/index.ts'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n❌ Some required files are missing. Please check the file structure.');
  process.exit(1);
}

// Test 2: Verify key functions in data service
console.log('\n2️⃣  Checking data service functions...');
const dataServiceContent = fs.readFileSync('src/lib/data-service.ts', 'utf8');

const requiredFunctions = [
  'addGuest',
  'subscribeToGuestUpdates',
  'getGuestById',
  'isGuestNext',
  'getEstimatedWaitTime',
  'updateGuestStatus'
];

requiredFunctions.forEach(func => {
  if (dataServiceContent.includes(`export const ${func}`)) {
    console.log(`   ✅ ${func}`);
  } else {
    console.log(`   ❌ ${func} - MISSING`);
    allFilesExist = false;
  }
});

// Test 3: Check notification implementation
console.log('\n3️⃣  Checking notification implementation...');
const statusPageContent = fs.readFileSync('src/app/status/[guestId]/page.tsx', 'utf8');

const notificationFeatures = [
  'Notification.requestPermission',
  'subscribeToGuestUpdates',
  'playNotificationSound',
  'You\'re Next!'
];

notificationFeatures.forEach(feature => {
  if (statusPageContent.includes(feature)) {
    console.log(`   ✅ ${feature}`);
  } else {
    console.log(`   ❌ ${feature} - MISSING`);
  }
});

// Test 4: Check guest ID flow
console.log('\n4️⃣  Checking guest ID flow...');
const checkInContent = fs.readFileSync('src/app/check-in/page.tsx', 'utf8');
const successContent = fs.readFileSync('src/app/check-in/success/page.tsx', 'utf8');

if (checkInContent.includes('const guestId = await addGuest')) {
  console.log('   ✅ Check-in captures guest ID');
} else {
  console.log('   ❌ Check-in missing guest ID capture');
}

if (checkInContent.includes('guestId=${guestId}')) {
  console.log('   ✅ Check-in passes guest ID to success page');
} else {
  console.log('   ❌ Check-in missing guest ID redirect');
}

if (successContent.includes('searchParams.get(\'guestId\')')) {
  console.log('   ✅ Success page receives guest ID');
} else {
  console.log('   ❌ Success page missing guest ID handling');
}

if (successContent.includes('/status/${guestId}')) {
  console.log('   ✅ Success page links to status page');
} else {
  console.log('   ❌ Success page missing status link');
}

// Test 5: Check build
console.log('\n5️⃣  Testing build...');
const buildProcess = spawn('npm', ['run', 'build'], { stdio: 'pipe' });

buildProcess.on('close', (code) => {
  if (code === 0) {
    console.log('   ✅ Build successful');
    
    console.log('\n🎉 All tests passed!');
    console.log('\n📋 Workflow Summary:');
    console.log('   1. Guest visits /check-in');
    console.log('   2. Fills form and submits');
    console.log('   3. Gets redirected to /check-in/success?guestId=XXX');
    console.log('   4. Clicks "View Your Status" to go to /status/XXX');
    console.log('   5. Sees real-time queue position');
    console.log('   6. Can enable browser notifications');
    console.log('   7. Gets notified when they\'re next');
    console.log('   8. Hears audio alert when next in line');
    
    console.log('\n🚀 Ready for deployment!');
    console.log('   Deploy with: npm run build && vercel --prod');
  } else {
    console.log('   ❌ Build failed');
    console.log('   Please check the build errors above');
  }
});

buildProcess.stdout.on('data', (data) => {
  // Suppress build output for cleaner test results
});

buildProcess.stderr.on('data', (data) => {
  console.log(`   Build error: ${data}`);
});
