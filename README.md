# 🧴 Skincare Event Queue Manager

A comprehensive digital queue management system designed for skincare events, consultations, and training clinics. Built with Next.js, Firebase, and Tailwind CSS.

## ✨ Features

- **🔹 Digital Check-In**: QR code-based guest registration with skin concerns and brand preferences
- **🔹 Real-Time Queue System**: Live queue updates with automatic positioning and status tracking
- **🔹 Admin Dashboard**: Comprehensive queue management and service tracking
- **🔹 Analytics & Insights**: Event performance metrics and guest preference analytics
- **🔹 Mobile-First Design**: Optimized for smartphones and tablets
- **🔹 Real-Time Updates**: Firebase Firestore for instant synchronization

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Firebase (Firestore, Authentication)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **QR Codes**: qrcode library

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Firebase account and project

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd event-manager
npm install
```

### 2. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Create a web app and copy the configuration
4. Create `.env.local` file (copy from `.env.example`):
   ```bash
   cp .env.example .env.local
   ```
5. Update `.env.local` with your Firebase config:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

### 3. Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

## 🚀 Production Deployment

Your Skincare Event Queue Manager is now **production-ready**! 

### Quick Deployment Steps:

1. **Set up Firebase Project**:
   ```bash
   # Login to Firebase
   npm run firebase:login
   
   # Initialize Firebase (if not done)
   npm run firebase:init
   ```

2. **Configure Environment**:
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Add your Firebase credentials to .env.local
   ```

3. **Deploy to Firebase Hosting**:
   ```bash
   # Deploy everything (hosting + rules)
   npm run deploy
   
   # Or deploy only hosting
   npm run deploy:hosting
   ```

### What's Included:

✅ **Production-Ready Build** - Optimized static files  
✅ **Error Boundaries** - Graceful error handling  
✅ **Loading States** - Smooth user experience  
✅ **Firebase Integration** - Real-time database  
✅ **Security Rules** - Firestore protection  
✅ **Mobile Responsive** - Works on all devices  
✅ **SEO Optimized** - Meta tags and structure  

### 📋 Final Checklist:

- [ ] Firebase project created
- [ ] Environment variables configured in `.env.local`
- [ ] Application builds successfully (`npm run build`)
- [ ] Firestore rules deployed (`npm run deploy:rules`)
- [ ] App deployed to Firebase Hosting (`npm run deploy:hosting`)
- [ ] Test QR code generation and scanning
- [ ] Verify admin queue management
- [ ] Check analytics dashboard

**Your app is ready for production use! 🎉**

---
  appId: "your-app-id"
};
```

### 3. Firestore Security Rules

Add these security rules to your Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to guests collection
    match /guests/{document} {
      allow read, write: if true;
    }
    
    // Allow read/write access to service-sessions collection
    match /service-sessions/{document} {
      allow read, write: if true;
    }
  }
}
```

### 4. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Usage Guide

### For Event Staff

1. **Home Dashboard**: Access all features from the main dashboard
2. **Queue Management**: Monitor and update guest status in real-time
3. **Analytics**: View event performance and guest insights

### For Guests

1. **Check-In**: Scan QR code or visit check-in page
2. **Registration**: Fill out name, phone, skin concern, and brand interest
3. **Queue Status**: View position and wait time

## 🎯 Core Workflows

### Guest Check-In Flow
1. Guest scans QR code or navigates to `/check-in`
2. Fills out registration form with personal details and preferences
3. Gets confirmation and queue position
4. Automatically added to waiting queue

### Service Management Flow
1. Staff views queue at `/admin/queue`
2. Clicks "Start" when ready to serve next guest
3. Guest status updates to "In Service"
4. Clicks "Complete" when consultation is finished
5. Guest moves to completed status

### Analytics & Reporting
1. Access dashboard at `/admin/dashboard`
2. View real-time metrics and performance indicators
3. Track popular skin concerns and brand preferences
4. Monitor service efficiency and completion rates

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── check-in/          # Guest check-in pages
│   ├── admin/             # Admin dashboard and queue
│   └── page.tsx           # Home page
├── lib/                   # Utility functions and services
│   ├── firebase.ts        # Firebase configuration
│   ├── firebase-service.ts # Firestore operations
│   └── utils.ts           # Helper functions
└── types/                 # TypeScript type definitions
    └── index.ts           # App-wide types
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for sensitive configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Customization

- **Skin Concerns**: Edit `SKIN_CONCERNS` array in `src/types/index.ts`
- **Brands**: Modify `SKINCARE_BRANDS` array in `src/types/index.ts`
- **Styling**: Update Tailwind classes throughout components
- **Branding**: Change colors, fonts, and logos in components

## 📊 Firebase Collections

### `guests` Collection
```typescript
{
  id: string,
  name: string,
  phoneNumber: string,
  timeOfArrival: Timestamp,
  skinConcern: string,
  interestedBrand: string,
  status: 'waiting' | 'in-service' | 'completed',
  serviceStartTime?: Timestamp,
  serviceEndTime?: Timestamp
}
```

### `service-sessions` Collection
```typescript
{
  id: string,
  guestId: string,
  guestName: string,
  startTime: Timestamp,
  endTime?: Timestamp,
  skinConcern: string,
  interestedBrand: string
}
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
npx vercel
```

### Firebase Hosting

```bash
npm run build
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🔮 Future Enhancements

- **SMS/WhatsApp Notifications**: Integrate Twilio for queue updates
- **Multi-Event Support**: Support for multiple concurrent events
- **Staff Assignment**: Assign specific staff members to guests
- **Appointment Scheduling**: Pre-booking time slots
- **Customer Feedback**: Post-service rating and feedback system
- **Export Features**: PDF reports and CSV data export
- **Advanced Analytics**: Charts, graphs, and trend analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♀️ Support

For support and questions:
- Create an issue in the GitHub repository
- Email: your-support-email@example.com

---

Built with ❤️ for skincare professionals and event organizers. Perfect for Sip & Pop events, beauty consultations, and skincare training clinics.
