'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Phone, Heart, Sparkles, Play, CheckCircle, Trash2, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';
import { subscribeToQueue, updateGuestStatus, deleteGuest, createServiceSession } from '@/lib/firebase-service';
import { Guest } from '@/types';
import { formatTime, cn } from '@/lib/utils';

export default function AdminQueue() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingGuests, setProcessingGuests] = useState<Set<string>>(new Set());

  useEffect(() => {
    const unsubscribe = subscribeToQueue((guestList) => {
      setGuests(guestList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStartService = async (guest: Guest) => {
    if (processingGuests.has(guest.id)) return;
    
    setProcessingGuests(prev => new Set(prev).add(guest.id));
    
    try {
      await updateGuestStatus(guest.id, 'in-service', {
        serviceStartTime: new Date()
      });
      
      await createServiceSession(guest);
      
      toast.success(`Started service for ${guest.name}`);
    } catch (error) {
      console.error('Error starting service:', error);
      toast.error('Failed to start service');
    } finally {
      setProcessingGuests(prev => {
        const newSet = new Set(prev);
        newSet.delete(guest.id);
        return newSet;
      });
    }
  };

  const handleCompleteService = async (guest: Guest) => {
    if (processingGuests.has(guest.id)) return;
    
    setProcessingGuests(prev => new Set(prev).add(guest.id));
    
    try {
      await updateGuestStatus(guest.id, 'completed', {
        serviceEndTime: new Date()
      });
      
      toast.success(`Completed service for ${guest.name}`);
    } catch (error) {
      console.error('Error completing service:', error);
      toast.error('Failed to complete service');
    } finally {
      setProcessingGuests(prev => {
        const newSet = new Set(prev);
        newSet.delete(guest.id);
        return newSet;
      });
    }
  };

  const handleDeleteGuest = async (guest: Guest) => {
    if (processingGuests.has(guest.id)) return;
    
    if (!confirm(`Are you sure you want to remove ${guest.name} from the queue?`)) {
      return;
    }
    
    setProcessingGuests(prev => new Set(prev).add(guest.id));
    
    try {
      await deleteGuest(guest.id);
      toast.success(`Removed ${guest.name} from queue`);
    } catch (error) {
      console.error('Error removing guest:', error);
      toast.error('Failed to remove guest');
    } finally {
      setProcessingGuests(prev => {
        const newSet = new Set(prev);
        newSet.delete(guest.id);
        return newSet;
      });
    }
  };

  const getStatusColor = (status: Guest['status']) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-service': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusIcon = (status: Guest['status']) => {
    switch (status) {
      case 'waiting': return <Clock className="h-4 w-4" />;
      case 'in-service': return <Play className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
    }
  };

  const waitingGuests = guests.filter(g => g.status === 'waiting');
  const inServiceGuests = guests.filter(g => g.status === 'in-service');
  const completedGuests = guests.filter(g => g.status === 'completed');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading queue...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-gray-900 transition-colors" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Queue Management</h1>
          </div>
          <Link href="/admin/dashboard">
            <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <BarChart3 className="h-5 w-5 mr-2" />
              Analytics
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Waiting</p>
                <p className="text-2xl font-bold text-gray-900">{waitingGuests.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Play className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Service</p>
                <p className="text-2xl font-bold text-gray-900">{inServiceGuests.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedGuests.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{guests.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Queue Sections */}
        <div className="space-y-8">
          {/* Waiting Queue */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Waiting Queue ({waitingGuests.length})</h2>
            {waitingGuests.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center shadow-sm">
                <p className="text-gray-500">No guests waiting</p>
              </div>
            ) : (
              <div className="space-y-4">
                {waitingGuests.map((guest) => (
                  <div key={guest.id} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-yellow-400">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="font-semibold text-gray-900">{guest.name}</span>
                            {guest.queuePosition && (
                              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                #{guest.queuePosition}
                              </span>
                            )}
                          </div>
                          <div className={cn('flex items-center px-2 py-1 rounded-full text-xs font-medium border', getStatusColor(guest.status))}>
                            {getStatusIcon(guest.status)}
                            <span className="ml-1 capitalize">{guest.status}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {guest.phoneNumber}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatTime(guest.timeOfArrival)}
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {guest.skinConcern}
                          </div>
                          <div className="flex items-center">
                            <Sparkles className="h-4 w-4 mr-1" />
                            {guest.interestedBrand}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleStartService(guest)}
                          disabled={processingGuests.has(guest.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Start
                        </button>
                        <button
                          onClick={() => handleDeleteGuest(guest)}
                          disabled={processingGuests.has(guest.id)}
                          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* In Service */}
          {inServiceGuests.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Currently In Service ({inServiceGuests.length})</h2>
              <div className="space-y-4">
                {inServiceGuests.map((guest) => (
                  <div key={guest.id} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-400">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="font-semibold text-gray-900">{guest.name}</span>
                          </div>
                          <div className={cn('flex items-center px-2 py-1 rounded-full text-xs font-medium border', getStatusColor(guest.status))}>
                            {getStatusIcon(guest.status)}
                            <span className="ml-1 capitalize">{guest.status}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {guest.phoneNumber}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Started: {guest.serviceStartTime ? formatTime(guest.serviceStartTime) : 'N/A'}
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {guest.skinConcern}
                          </div>
                          <div className="flex items-center">
                            <Sparkles className="h-4 w-4 mr-1" />
                            {guest.interestedBrand}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleCompleteService(guest)}
                          disabled={processingGuests.has(guest.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Complete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed (Recent) */}
          {completedGuests.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recently Completed ({completedGuests.slice(-5).length} of {completedGuests.length})</h2>
              <div className="space-y-4">
                {completedGuests.slice(-5).reverse().map((guest) => (
                  <div key={guest.id} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-400 opacity-75">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="font-semibold text-gray-900">{guest.name}</span>
                          </div>
                          <div className={cn('flex items-center px-2 py-1 rounded-full text-xs font-medium border', getStatusColor(guest.status))}>
                            {getStatusIcon(guest.status)}
                            <span className="ml-1 capitalize">{guest.status}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {guest.phoneNumber}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Completed: {guest.serviceEndTime ? formatTime(guest.serviceEndTime) : 'N/A'}
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {guest.skinConcern}
                          </div>
                          <div className="flex items-center">
                            <Sparkles className="h-4 w-4 mr-1" />
                            {guest.interestedBrand}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
