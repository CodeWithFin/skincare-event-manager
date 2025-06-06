'use client';

import Link from 'next/link';
import { QrCode, Users, BarChart3, UserPlus } from 'lucide-react';
import QRCode from 'qrcode';
import { useState, useEffect } from 'react';

export default function Home() {
  const [qrDataURL, setQrDataURL] = useState<string>('');

  useEffect(() => {
    const generateQR = async () => {
      try {
        const checkInURL = `${window.location.origin}/check-in`;
        const qrUrl = await QRCode.toDataURL(checkInURL, {
          width: 200,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });
        setQrDataURL(qrUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQR();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧴 Skincare Event Queue Manager
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Streamline your skincare events with digital check-ins, real-time queue management, 
            and comprehensive analytics. Perfect for Sip & Pop events and skincare consultations.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/check-in" className="group">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 group-hover:bg-green-200 transition-colors">
                <UserPlus className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Guest Check-In</h3>
              <p className="text-gray-600 text-sm">Register guests for the event</p>
            </div>
          </Link>

          <Link href="/admin/queue" className="group">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-200 transition-colors">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Queue Management</h3>
              <p className="text-gray-600 text-sm">Manage the service queue</p>
            </div>
          </Link>

          <Link href="/admin/dashboard" className="group">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4 group-hover:bg-purple-200 transition-colors">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-gray-600 text-sm">View event statistics</p>
            </div>
          </Link>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
              <QrCode className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">QR Code</h3>
            <p className="text-gray-600 text-sm mb-4">For guest check-in</p>
            {qrDataURL && (
              <div className="flex justify-center">
                <img src={qrDataURL} alt="Check-in QR Code" className="w-32 h-32" />
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Digital Check-In</h4>
                  <p className="text-gray-600 text-sm">QR code-based registration with skin concern and brand preferences</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Real-Time Queue</h4>
                  <p className="text-gray-600 text-sm">Live queue updates with status tracking and position indicators</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Service Tracking</h4>
                  <p className="text-gray-600 text-sm">Monitor service times and track guest progress</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Analytics Dashboard</h4>
                  <p className="text-gray-600 text-sm">Comprehensive insights on event performance and guest preferences</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Mobile-First Design</h4>
                  <p className="text-gray-600 text-sm">Optimized for smartphones and tablets</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Scalable Solution</h4>
                  <p className="text-gray-600 text-sm">Works for any skincare event or training clinic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
