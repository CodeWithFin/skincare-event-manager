# Vercel Deployment Guide for Skincare Event Manager

## Prerequisites ✅
- [x] Next.js application built successfully
- [x] Firebase project configured (`skincare-event-manager`)
- [x] Environment variables set in `.env.local`
- [x] Vercel CLI installed
- [x] `vercel.json` configuration ready

## Step 1: Authenticate with Vercel

Run this command in your terminal:
```bash
vercel login
```

This will:
1. Open a browser window
2. Redirect you to Vercel's login page
3. Sign in with GitHub, GitLab, Bitbucket, or email
4. Authenticate the CLI

## Step 2: Deploy to Vercel

After authentication, run:
```bash
cd /home/finley/start-up/event-manager
./deploy.sh
```

Or manually:
```bash
vercel --prod
```

## Step 3: Set Environment Variables

After the first deployment, you'll need to add your Firebase environment variables to Vercel:

### Option A: Via Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBdZuglbVZbofiwTXrqf6_CkeL0UhNJUZo
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=skincare-event-manager.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=skincare-event-manager
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=skincare-event-manager.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=900327140772
NEXT_PUBLIC_FIREBASE_APP_ID=1:900327140772:web:f5e54916622a5040716531
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-HD5830PESH
```

### Option B: Via CLI
```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
vercel env add NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

## Step 4: Redeploy

After setting environment variables:
```bash
vercel --prod
```

## Expected Output

Your app will be deployed to a URL like:
- Production: `https://skincare-event-manager-[random].vercel.app`
- Or custom domain if configured

## Features to Test After Deployment

1. **Home Page**: Queue registration and QR code display
2. **Check-in Page**: QR code scanner functionality
3. **Admin Dashboard**: Real-time queue management
4. **Firebase Integration**: User authentication and data persistence

## Troubleshooting

### Build Errors
- Check `npm run build` locally first
- Ensure all dependencies are in `package.json`

### Environment Variables Not Working
- Verify variables are set in Vercel dashboard
- Redeploy after adding variables
- Check variable names match exactly

### Firebase Connection Issues
- Verify Firebase project is active
- Check Firestore rules allow read/write
- Ensure Authentication is enabled

## Next Steps After Deployment

1. Test all functionality on the live site
2. Set up custom domain (optional)
3. Monitor usage in Vercel analytics
4. Set up Firebase monitoring

## Support

- Vercel Docs: https://vercel.com/docs
- Firebase Docs: https://firebase.google.com/docs
- Next.js Docs: https://nextjs.org/docs
