# 🚀 Deployment Guide - Skincare Event Queue Manager

## Prerequisites
- Firebase account
- Firebase CLI installed globally: `npm install -g firebase-tools`
- Node.js 18+ installed

## Step-by-Step Deployment

### 1. Firebase Project Setup

1. **Create Firebase Project**
   ```bash
   # Login to Firebase
   firebase login
   
   # Create new project (or use existing)
   firebase projects:create your-project-id
   ```

2. **Initialize Firebase in your project**
   ```bash
   cd /path/to/event-manager
   firebase init
   ```
   
   Select:
   - ✅ Firestore: Configure security rules and indexes files
   - ✅ Hosting: Configure files for Firebase Hosting and (optionally) GitHub Action deploys

3. **Update Firebase Configuration**
   - Go to Firebase Console → Your Project → Project Settings
   - Scroll down to "Your apps" and click "Web app" icon
   - Copy the config object

### 2. Environment Variables Setup

1. **Create `.env.local` file** (copy from `.env.example`):
   ```bash
   cp .env.example .env.local
   ```

2. **Update `.env.local` with your Firebase config**:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_APP_URL=https://your-project-id.web.app
   ```

3. **Update `.firebaserc`**:
   ```json
   {
     "projects": {
       "default": "your-actual-project-id"
     }
   }
   ```

### 3. Deploy Firestore Rules

```bash
# Deploy security rules
npm run firebase:rules

# Or deploy everything
firebase deploy
```

### 4. Build and Deploy

```bash
# Install dependencies
npm install

# Test locally first
npm run dev

# Build for production
npm run build

# Deploy to Firebase Hosting
npm run deploy
```

### 5. Verify Deployment

1. Check your Firebase Hosting URL: `https://your-project-id.web.app`
2. Test the QR code generation and check-in flow
3. Verify the admin queue management works
4. Check the analytics dashboard

## Production Checklist

- [ ] Firebase project created and configured
- [ ] Environment variables set up
- [ ] Firestore security rules deployed
- [ ] Application built successfully
- [ ] Deployed to Firebase Hosting
- [ ] QR code check-in tested
- [ ] Admin queue management tested
- [ ] Analytics dashboard working
- [ ] Mobile responsiveness verified

## Troubleshooting

### Common Issues:

**1. Firebase Config Error**
- Ensure all environment variables are set correctly
- Check that Firebase project is active: `firebase projects:list`

**2. Build Errors**
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

**3. Firestore Permission Denied**
- Deploy security rules: `firebase deploy --only firestore:rules`
- Check rules in Firebase Console

**4. Static Export Issues**
- Ensure `output: 'export'` is set in `next.config.ts`
- Check for dynamic features that don't work with static export

### Support Commands:

```bash
# Check Firebase project status
firebase projects:list

# View deployment logs
firebase hosting:channel:list

# Test security rules locally
firebase emulators:start --only firestore

# View build output
npm run build 2>&1 | tee build.log
```

## Custom Domain (Optional)

1. In Firebase Console → Hosting → Add custom domain
2. Follow DNS setup instructions
3. Update `NEXT_PUBLIC_APP_URL` in environment variables

## Monitoring & Analytics

- Firebase Console → Analytics for usage stats
- Firebase Console → Firestore for database monitoring  
- Check browser console for any client-side errors

Your Skincare Event Queue Manager is now ready for production! 🎉
