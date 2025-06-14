'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Home, Eye, Bell } from 'lucide-react';

export default function CheckInSuccess() {
  const searchParams = useSearchParams();
  const guestId = searchParams.get('guestId');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-xl p-8 shadow-lg text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Successfully Checked In! 🎉
          </h1>
          
          <p className="text-gray-600 mb-6">
            Welcome to our skincare event! You&apos;ve been added to the queue and our team will be with you shortly.
          </p>

          {/* Status Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
            <ul className="text-blue-800 text-sm text-left space-y-1">
              <li>• Check your queue position using the button below</li>
              <li>• Enable notifications to get alerted when you&apos;re next</li>
              <li>• Average wait time is 10-15 minutes</li>
              <li>• Feel free to enjoy the refreshments provided</li>
            </ul>
          </div>

          {/* Notification Feature Highlight */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <Bell className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="font-semibold text-yellow-900">Get Notified!</span>
            </div>
            <p className="text-yellow-800 text-sm">
              Enable notifications on your status page to get alerted when you&apos;re next in line!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {guestId && (
              <Link href={`/status/${guestId}`} className="block">
                <button className="w-full bg-rose-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center">
                  <Eye className="h-5 w-5 mr-2" />
                  View Your Status & Position
                </button>
              </Link>
            )}
            
            <Link href="/" className="block">
              <button className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-xs text-gray-500">
            <p>Thank you for joining our skincare event!</p>
            <p>We&apos;re excited to help you with your skincare journey.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
