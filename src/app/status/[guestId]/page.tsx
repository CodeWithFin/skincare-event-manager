'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Guest } from '@/types';
import { subscribeToGuestUpdates, getEstimatedWaitTime, isGuestNext } from '@/lib/data-service';
import { Clock, User, Bell, CheckCircle } from 'lucide-react';

export default function GuestStatusPage() {
  const params = useParams();
  const router = useRouter();
  const guestId = params.guestId as string;
  
  const [guest, setGuest] = useState<Guest | null>(null);
  const [estimatedWait, setEstimatedWait] = useState(0);
  const [isNext, setIsNext] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if (!guestId) return;

    // Subscribe to guest updates
    const unsubscribe = subscribeToGuestUpdates(guestId, (updatedGuest) => {
      setGuest(updatedGuest);
      
      if (updatedGuest) {
        const wait = getEstimatedWaitTime(guestId);
        const next = isGuestNext(guestId);
        
        setEstimatedWait(wait);
        setIsNext(next);
        
        // Show notification if guest is next
        if (next && notificationPermission === 'granted') {
          new Notification('You\'re Next!', {
            body: 'Please head to the consultation area. You\'re next in line!',
            icon: '/favicon.ico',
            tag: 'next-in-line'
          });
        }
        
        // Play notification sound if next
        if (next) {
          playNotificationSound();
        }
      }
    });

    return () => unsubscribe();
  }, [guestId, notificationPermission]);

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          setNotificationPermission(permission);
        });
      }
    }
  }, []);

  const playNotificationSound = () => {
    // Create a simple notification sound
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const enableNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
    }
  };

  if (!guest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Queue Status</h1>
          <p className="text-gray-600">Hi {guest.name}! Here&apos;s your current status</p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          {/* Current Status */}
          <div className="text-center mb-6">
            {guest.status === 'waiting' && (
              <>
                {isNext ? (
                  <div className="animate-pulse">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-green-600 mb-2">You&apos;re Next!</h2>
                    <p className="text-gray-600">Please head to the consultation area</p>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      Position #{guest.queuePosition}
                    </h2>
                    <p className="text-gray-600">in the queue</p>
                  </>
                )
                }
              </>
            )}
            
            {guest.status === 'in-service' && (
              <>
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
                <h2 className="text-xl font-bold text-yellow-600 mb-2">In Service</h2>
                <p className="text-gray-600">Your consultation is in progress</p>
              </>
            )}
            
            {guest.status === 'completed' && (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-green-600 mb-2">Completed</h2>
                <p className="text-gray-600">Thank you for visiting us!</p>
              </>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{guest.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Skin Concern:</span>
              <span className="font-medium">{guest.skinConcern}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Interested Brand:</span>
              <span className="font-medium">{guest.interestedBrand}</span>
            </div>
            
            {guest.status === 'waiting' && estimatedWait > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Wait:</span>
                <span className="font-medium text-blue-600">{estimatedWait} minutes</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-gray-600">Check-in Time:</span>
              <span className="font-medium">
                {guest.timeOfArrival.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        {notificationPermission === 'default' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Bell className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
              <div className="flex-1">
                <h3 className="font-medium text-blue-900 mb-1">Enable Notifications</h3>
                <p className="text-sm text-blue-700 mb-3">
                  Get notified when you&apos;re next in line!
                </p>
                <button
                  onClick={enableNotifications}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Enable Notifications
                </button>
              </div>
            </div>
          </div>
        )}

        {notificationPermission === 'granted' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-green-800 font-medium">Notifications enabled</span>
            </div>
          </div>
        )}

        {/* Auto Refresh Notice */}
        <div className="text-center text-sm text-gray-500 mb-6">
          <Clock className="w-4 h-4 inline mr-1" />
          Status updates automatically
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-rose-600 text-white py-3 rounded-lg font-medium hover:bg-rose-700 transition-colors"
          >
            Refresh Status
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
