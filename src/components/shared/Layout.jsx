import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  ChartBarIcon, 
  TableCellsIcon, 
  PresentationChartLineIcon,
  Bars3Icon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

const Layout = ({ children }) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  const navItems = [
    { 
      path: '/', 
      icon: ChartBarIcon, 
      label: 'Analysis',
      description: 'Detailed stock analysis and metrics'
    },
    { 
      path: '/card2', 
      icon: TableCellsIcon, 
      label: 'Compare',
      description: 'Compare multiple stocks'
    },
    { 
      path: '/card3', 
      icon: PresentationChartLineIcon, 
      label: 'Scenarios',
      description: 'Investment scenario modeling'
    }
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Navigation Sidebar */}
      <motion.nav
        initial={false}
        animate={{ width: isNavExpanded ? '16rem' : '5rem' }}
        className="bg-white border-r border-gray-200 flex flex-col"
      >
        {/* Logo/Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
            {isNavExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-3 font-semibold text-gray-900"
              >
                Sentinel Flash
              </motion.span>
            )}
          </div>
        </div>

        {/* Nav Toggle */}
        <button
          onClick={() => setIsNavExpanded(!isNavExpanded)}
          className="absolute right-0 top-4 transform translate-x-1/2 bg-white rounded-full p-1.5 border border-gray-200 text-gray-500 hover:text-gray-700"
        >
          <Bars3Icon className="h-5 w-5" />
        </button>

        {/* Nav Links */}
        <div className="flex-1 py-4 px-2">
          {navItems.map(({ path, icon: Icon, label, description }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 mb-1 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <Icon className="h-6 w-6 flex-shrink-0" />
              {isNavExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-3"
                >
                  <div className="font-medium">{label}</div>
                  <div className="text-xs text-gray-500">{description}</div>
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
