'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ShoppingCart, Users, Clock, Star } from 'lucide-react';

interface Activity {
  id: number;
  type: 'order' | 'signup' | 'review' | 'viewing';
  message: string;
  location: string;
  time: string;
  icon: React.ReactNode;
}

// Sample activities for demonstration
const sampleActivities: Omit<Activity, 'id' | 'time'>[] = [
  { type: 'order', message: 'Sarah from London just ordered', location: 'Research Paper - 15 pages', icon: <ShoppingCart className="w-4 h-4 text-green-500" /> },
  { type: 'order', message: 'Michael from Sydney placed an order', location: 'Dissertation - PhD Level', icon: <ShoppingCart className="w-4 h-4 text-green-500" /> },
  { type: 'order', message: 'Emma from New York just ordered', location: 'Essay - Business Studies', icon: <ShoppingCart className="w-4 h-4 text-green-500" /> },
  { type: 'signup', message: 'James from Toronto signed up', location: 'New Student Registration', icon: <Users className="w-4 h-4 text-blue-500" /> },
  { type: 'order', message: 'Olivia from Melbourne placed an order', location: 'Case Study - Nursing', icon: <ShoppingCart className="w-4 h-4 text-green-500" /> },
  { type: 'review', message: 'David left a 5-star review', location: '"Excellent quality work!"', icon: <Star className="w-4 h-4 text-yellow-500" /> },
  { type: 'order', message: 'Sophie from Dubai just ordered', location: 'Thesis - Master\'s Level', icon: <ShoppingCart className="w-4 h-4 text-green-500" /> },
  { type: 'signup', message: 'Alex from Singapore signed up', location: 'New Student Registration', icon: <Users className="w-4 h-4 text-blue-500" /> },
  { type: 'order', message: 'Isabella from Mumbai placed an order', location: 'Coursework - Law', icon: <ShoppingCart className="w-4 h-4 text-green-500" /> },
  { type: 'order', message: 'William from Berlin just ordered', location: 'Literature Review - 10 pages', icon: <ShoppingCart className="w-4 h-4 text-green-500" /> },
];

export default function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [viewerCount, setViewerCount] = useState(32);

  const getRandomActivity = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * sampleActivities.length);
    const activity = sampleActivities[randomIndex];
    return {
      ...activity,
      id: Date.now(),
      time: 'Just now',
    };
  }, []);

  useEffect(() => {
    // Show first notification after 5 seconds
    const initialTimer = setTimeout(() => {
      const activity = getRandomActivity();
      setCurrentActivity(activity);
      setIsVisible(true);
      setActivities(prev => [activity, ...prev.slice(0, 9)]);
    }, 5000);

    // Then show notifications every 15-30 seconds
    const interval = setInterval(() => {
      const activity = getRandomActivity();
      setCurrentActivity(activity);
      setIsVisible(true);
      setActivities(prev => [activity, ...prev.slice(0, 9)]);
    }, Math.random() * 15000 + 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [getRandomActivity]);

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (isVisible) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      return () => clearTimeout(hideTimer);
    }
  }, [isVisible, currentActivity]);

  // Update viewer count periodically
  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(20, Math.min(50, prev + change));
      });
    }, 10000);
    return () => clearInterval(viewerInterval);
  }, []);

  if (!currentActivity) return null;

  return (
    <>
      {/* Floating Notification Popup */}
      <div 
        className={`fixed bottom-4 left-4 z-50 max-w-sm transition-all duration-500 transform ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-gray-200 dark:border-slate-700 p-4 relative overflow-hidden">
          {/* Animated gradient border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 animate-pulse"></div>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-start gap-3 mt-1">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
              {currentActivity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {currentActivity.message}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {currentActivity.location}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {currentActivity.time}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Activity Counter - Bottom Right */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-full shadow-lg border border-gray-200 dark:border-slate-700 px-4 py-2 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            <span className="text-green-600 dark:text-green-400 font-bold">{viewerCount}</span> people viewing
          </span>
        </div>
      </div>
    </>
  );
}
