# 🧴 Skincare Event Queue Manager

A comprehensive digital queue management system designed for skincare events, consultations, and training clinics. Built with Next.js and Tailwind CSS, ready for deployment on Vercel.

## ✨ Features

- **🔹 Digital Check-In**: QR code-based guest registration with skin concerns and brand preferences
- **🔹 Real-Time Queue System**: Live queue updates with automatic positioning and status tracking
- **🔹 Admin Dashboard**: Comprehensive queue management and service tracking
- **🔹 Analytics & Insights**: Event performance metrics and guest preference analytics
- **🔹 Mobile-First Design**: Optimized for smartphones and tablets
- **🔹 In-Memory Storage**: Fast, responsive data handling for events

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Data**: In-memory storage with real-time updates
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **QR Codes**: qrcode library

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd event-manager
npm install
```

### 2. Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

## 🚀 Production Deployment

Your Skincare Event Queue Manager is now **production-ready** and optimized for Vercel deployment!

### Quick Deployment Steps:

1. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI (if not installed)
   npm i -g vercel
   
   # Deploy to Vercel
   vercel
   ```

2. **Or use GitHub Integration**:
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Automatic deployments on every push

### What's Included:

✅ **Production-Ready Build** - Optimized static files  
✅ **Error Boundaries** - Graceful error handling  
✅ **Responsive Design** - Works on all devices  
✅ **Real-Time Updates** - Live queue synchronization  
✅ **Performance Optimized** - Fast loading and interactions  
✅ **Error Handling** - Robust error management

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
│   ├── data-service.ts    # In-memory data operations
│   └── utils.ts           # Helper functions
└── types/                 # TypeScript type definitions
    └── index.ts           # App-wide types
```

## 🔧 Configuration

### Customization

- **Skin Concerns**: Edit `SKIN_CONCERNS` array in `src/types/index.ts`
- **Brands**: Modify `SKINCARE_BRANDS` array in `src/types/index.ts`
- **Styling**: Update Tailwind classes throughout components
- **Branding**: Change colors, fonts, and logos in components

## 📊 Data Structure

### Guest Object
```typescript
{
  id: string,
  name: string,
  phoneNumber: string,
  timeOfArrival: Date,
  skinConcern: string,
  interestedBrand: string,
  status: 'waiting' | 'in-service' | 'completed',
  serviceStartTime?: Date,
  serviceEndTime?: Date,
  queuePosition: number
}
```

### Service Session Object
```typescript
{
  id: string,
  guestId: string,
  guestName: string,
  startTime: Date,
  endTime?: Date,
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

### Alternative Deployment Options

- **Netlify**: Connect repository for auto-deployments
- **Custom Hosting**: Use `npm run build` and serve `out/` folder

## 🔮 Future Enhancements

- **SMS/WhatsApp Notifications**: Integrate Twilio for queue updates
- **Multi-Event Support**: Support for multiple concurrent events
- **Staff Assignment**: Assign specific staff members to guests
- **Appointment Scheduling**: Pre-booking time slots
- **Customer Feedback**: Post-service rating and feedback system
- **Export Features**: PDF reports and CSV data export
- **Advanced Analytics**: Charts, graphs, and trend analysis
- **Database Integration**: Add Supabase or other database for persistence

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

**Built with ❤️ for skincare professionals and event organizers. Perfect for Sip & Pop events, beauty consultations, and skincare training clinics.**
