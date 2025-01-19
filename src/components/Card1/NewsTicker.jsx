import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarIcon, NewspaperIcon } from '@heroicons/react/24/outline'

export default function NewsTicker({ stock }) {
  const [activeNewsIndex, setActiveNewsIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setActiveNewsIndex(current => 
          current === stock.news.length - 1 ? 0 : current + 1
        )
      }
    }, 5000)

    return () => clearInterval(intervalRef.current)
  }, [stock.news.length, isPaused])

  const upcomingEvents = stock.events?.filter(event => 
    new Date(event.date) >= new Date()
  ).slice(0, 3)

  return (
    <div className="space-y-4">
      {/* News Ticker */}
      <div
        className="relative h-12 bg-gray-50 rounded-lg overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNewsIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 p-3 flex items-center"
          >
            <NewspaperIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-600 truncate">
              {stock.news[activeNewsIndex].headline}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Upcoming Events */}
      {upcomingEvents?.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Upcoming Events</h4>
          <div className="space-y-2">
            {upcomingEvents.map(event => (
              <div
                key={event.id}
                className="flex items-center space-x-3 text-sm"
              >
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900 font-medium">
                  {new Date(event.date).toLocaleDateString()}
                </span>
                <span className="text-gray-600">{event.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
