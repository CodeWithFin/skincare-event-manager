'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Phone, Clock, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { addGuest } from '@/lib/firebase-service';
import { SKIN_CONCERNS, SKINCARE_BRANDS, SkinConcern, SkincareBrand } from '@/types';

export default function CheckIn() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    skinConcern: '' as SkinConcern,
    interestedBrand: '' as SkincareBrand,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phoneNumber || !formData.skinConcern || !formData.interestedBrand) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await addGuest({
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        timeOfArrival: new Date(),
        skinConcern: formData.skinConcern,
        interestedBrand: formData.interestedBrand,
      });
      
      toast.success('Successfully checked in! You\'ve been added to the queue.', {
        duration: 4000,
      });
      
      // Redirect to a success page or back to home
      setTimeout(() => {
        router.push('/check-in/success');
      }, 2000);
      
    } catch (error) {
      console.error('Error checking in:', error);
      toast.error('Failed to check in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-gray-900 transition-colors" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Guest Check-In</h1>
        </div>

        {/* Welcome Message */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-lg">
          <div className="text-center">
            <div className="text-4xl mb-4">🌸</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Our Skincare Event!</h2>
            <p className="text-gray-600">
              Please fill out the form below to join the queue. We&apos;ll take great care of your skin concerns!
            </p>
          </div>
        </div>

        {/* Check-in Form */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 mr-2 text-pink-500" />
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone className="h-4 w-4 mr-2 text-pink-500" />
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="(555) 123-4567"
                required
              />
            </div>

            {/* Skin Concern Dropdown */}
            <div>
              <label htmlFor="skinConcern" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Heart className="h-4 w-4 mr-2 text-pink-500" />
                Primary Skin Concern *
              </label>
              <select
                id="skinConcern"
                value={formData.skinConcern}
                onChange={(e) => handleInputChange('skinConcern', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select your main skin concern</option>
                {SKIN_CONCERNS.map((concern) => (
                  <option key={concern} value={concern}>
                    {concern}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Interest Dropdown */}
            <div>
              <label htmlFor="interestedBrand" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Sparkles className="h-4 w-4 mr-2 text-pink-500" />
                Interested Brand *
              </label>
              <select
                id="interestedBrand"
                value={formData.interestedBrand}
                onChange={(e) => handleInputChange('interestedBrand', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select a brand you&apos;re interested in</option>
                {SKINCARE_BRANDS.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Display */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                Check-in Time: {new Date().toLocaleString()}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Checking In...
                </div>
              ) : (
                'Join the Queue'
              )}
            </button>
          </form>
        </div>

        {/* Information Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• You&apos;ll be added to our digital queue based on your arrival time</li>
            <li>• Our staff will update your status as your turn approaches</li>
            <li>• Average consultation time is 15-20 minutes</li>
            <li>• You can check the admin queue to see your position</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
