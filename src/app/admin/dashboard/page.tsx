'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Clock, Users, Heart, Award, RefreshCw } from 'lucide-react';
import { calculateEventStats } from '@/lib/data-service';
import { EventStats } from '@/types';
import { formatDuration } from '@/lib/utils';

export default function AdminDashboard() {
  const [stats, setStats] = useState<EventStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadStats = async () => {
    setLoading(true);
    try {
      const eventStats = await calculateEventStats();
      setStats(eventStats);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const refreshStats = () => {
    loadStats();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
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
            <Link href="/admin/queue" className="mr-4">
              <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-gray-900 transition-colors" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Event Analytics</h1>
          </div>
          <button
            onClick={refreshStats}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {stats && (
          <>
            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Guests</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalGuests}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Guests Served</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.guestsServed}</p>
                    <p className="text-xs text-gray-500">
                      {stats.totalGuests > 0 ? Math.round((stats.guestsServed / stats.totalGuests) * 100) : 0}% completion rate
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Service Time</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats.averageServiceTime > 0 ? formatDuration(stats.averageServiceTime) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Currently In Service</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.currentlyInService}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Items */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Most Requested Skin Concern */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <Heart className="h-6 w-6 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">Top Skin Concern</h3>
                </div>
                <div className="text-center py-6">
                  <p className="text-2xl font-bold text-pink-600 mb-2">{stats.mostRequestedSkinConcern}</p>
                  <p className="text-gray-600">Most requested concern at this event</p>
                </div>
              </div>

              {/* Most Requested Brand */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">Popular Brand</h3>
                </div>
                <div className="text-center py-6">
                  <p className="text-2xl font-bold text-yellow-600 mb-2">{stats.mostRequestedBrand}</p>
                  <p className="text-gray-600">Most interested brand at this event</p>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Event Performance</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Completion Rate */}
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#f3f4f6"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#10b981"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${stats.totalGuests > 0 ? (stats.guestsServed / stats.totalGuests) * 251.2 : 0} 251.2`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900">
                        {stats.totalGuests > 0 ? Math.round((stats.guestsServed / stats.totalGuests) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                </div>

                {/* Efficiency Score */}
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#f3f4f6"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#3b82f6"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${stats.averageServiceTime > 0 && stats.averageServiceTime <= 20 ? 251.2 * 0.9 : stats.averageServiceTime <= 30 ? 251.2 * 0.7 : 251.2 * 0.5} 251.2`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900">
                        {stats.averageServiceTime > 0 && stats.averageServiceTime <= 20 ? '90' : stats.averageServiceTime <= 30 ? '70' : '50'}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-600">Efficiency Score</p>
                </div>

                {/* Activity Level */}
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#f3f4f6"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#8b5cf6"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${Math.min((stats.totalGuests / 20) * 251.2, 251.2)} 251.2`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900">
                        {Math.min(Math.round((stats.totalGuests / 20) * 100), 100)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-600">Activity Level</p>
                </div>
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/admin/queue" className="block">
                  <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                      <Users className="h-6 w-6 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Manage Queue</p>
                        <p className="text-sm text-gray-600">View and update guest status</p>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <Link href="/check-in" className="block">
                  <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                      <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Add Guest</p>
                        <p className="text-sm text-gray-600">Manual check-in</p>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <button onClick={refreshStats} className="block w-full">
                  <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                      <RefreshCw className="h-6 w-6 text-purple-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Refresh Data</p>
                        <p className="text-sm text-gray-600">Update statistics</p>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-center mt-6 text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleString()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
