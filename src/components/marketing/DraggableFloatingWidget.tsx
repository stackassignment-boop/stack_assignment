'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, GripVertical, X } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

// Initialize position from localStorage or default
const getInitialPosition = (): Position => {
  if (typeof window !== 'undefined') {
    const savedPosition = localStorage.getItem('floatingWidgetPosition');
    if (savedPosition) {
      try {
        return JSON.parse(savedPosition);
      } catch {
        // Use default position if parsing fails
      }
    }
  }
  return { x: 20, y: 20 };
};

// Check if widget was dismissed
const getInitialDismissed = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('floatingWidgetDismissed') === 'true';
  }
  return false;
};

/**
 * Prefilled WhatsApp enquiry. Built with encodeURIComponent rather than
 * hand-encoded, because the previous literal string contained an unencoded
 * space that broke the tail of the message.
 *
 * The fields changed as well. It used to ask for Subject / Word Count /
 * Deadline / Academic Level, which is an intake form for a piece of writing to
 * be produced. It now asks what the student is working on and what kind of help
 * they want, and uses the Australian term "unit" rather than "subject" or
 * "module" — the same vocabulary as their unit guide.
 */
const WHATSAPP_MESSAGE = [
  'Hi Stack Assignment! I would like help with:',
  'University: _____',
  'Unit code: _____',
  'Assessment: _____',
  'Due date: _____',
  'What I need (tutoring / editing / feedback): _____',
].join('\n');

// Number is currently an Indian mobile. For an Australian audience this is a
// weak trust signal and it breaks NAP consistency with any local listing, so it
// is worth replacing with an AU number once one exists.
const WHATSAPP_HREF = `https://wa.me/919907300710?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function DraggableFloatingWidget() {
  const [position, setPosition] = useState<Position>(getInitialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDismissed, setIsDismissed] = useState(getInitialDismissed);
  const containerRef = useRef<HTMLDivElement>(null);

  // Save position to localStorage
  const savePosition = useCallback((pos: Position) => {
    localStorage.setItem('floatingWidgetPosition', JSON.stringify(pos));
  }, []);

  // Handle dismiss
  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
    localStorage.setItem('floatingWidgetDismissed', 'true');
  }, []);

  // A "N viewing" badge used to live here, seeded at 38 and moved by a random
  // walk between 20 and 50 every ten seconds. There was no fetch behind it — the
  // pulsing green dot presented an invented number as live site traffic. That is
  // a false representation under the Australian Consumer Law (Competition and
  // Consumer Act 2010 Sch 2 ss 18, 29), and because this widget is mounted in
  // MainLayout it appeared on every page of the site. Removed along with its
  // state and interval.

  // Handle mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Constrain to viewport
      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 120;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        savePosition(position);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, position, savePosition]);

  // Handle touch move for mobile
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      
      const newX = touch.clientX - dragOffset.x;
      const newY = touch.clientY - dragOffset.y;
      
      // Constrain to viewport
      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 120;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    };

    const handleTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        savePosition(position);
      }
    };

    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragOffset, position, savePosition]);

  // Don't render if dismissed - must be after all hooks
  if (isDismissed) {
    return null;
  }

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  // Handle touch start for mobile dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    setIsDragging(true);
  };

  return (
    <div
      ref={containerRef}
      className={`fixed z-[100] select-none ${isDragging ? 'cursor-grabbing' : ''}`}
      style={{
        right: `${position.x}px`,
        bottom: `${position.y}px`,
        transition: isDragging ? 'none' : 'all 0.3s ease'
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Combined Widget */}
      <div className="flex flex-col items-end gap-2">
        {/* Close Button - Mobile Only */}
        <button
          onClick={handleDismiss}
          className="md:hidden bg-slate-200 dark:bg-slate-700 rounded-full p-1.5 shadow-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          aria-label="Close widget"
        >
          <X className="w-3 h-3 text-slate-600 dark:text-slate-300" />
        </button>

        {/* WhatsApp Widget */}
        <div className="relative flex items-center gap-2">
          {/* Drag Handle Indicator */}
          <div 
            className="bg-gradient-to-b from-green-500 to-green-600 rounded-lg p-1.5 opacity-70 hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing shadow-lg"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <GripVertical className="w-4 h-4 text-white" />
          </div>
          
          {/* WhatsApp Button */}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (isDragging) {
                e.preventDefault();
              }
            }}
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-7 h-7" />
          </a>

          {/* Tooltip */}
          <span className={`absolute right-0 top-full mt-2 bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl transition-opacity duration-200 ${showTooltip ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            Drag grip to reposition
          </span>
        </div>
      </div>
    </div>
  );
}
