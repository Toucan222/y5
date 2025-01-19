import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  BiBarChartAlt2, 
  BiLineChart, 
  BiPieChart, 
  BiMenu,
  BiStar,
  BiBell 
} from 'react-icons/bi'
import { motion, AnimatePresence } from 'framer-motion'
import { useWatchlist } from '../../hooks/useWatchlist'
import { useAlerts } from '../../hooks/useAlerts'

export default function Navigation({ isExpanded, onToggle }) {
  const { watchlist } = useWatchlist()
  const { alerts } = useAlerts()
  const [showWatchlist, setShowWatchlist] = useState(false)

  const navItems = [
    { path: '/', icon: BiBarChartAlt2, label: 'Analysis' },
    { path: '/card2', icon: BiLineChart, label: 'Stocks' },
    { path: '/card3', icon: BiPieChart, label: 'Scenarios' }
  ]

  const hasActiveAlerts = alerts.some(alert => !alert.acknowledged)

  return (
    <motion.nav
      initial={false}
      animate={{ width: isExpanded ? 256 : 64 }}
      className="relative bg-white border-r border-gray-200 flex flex-col h-screen"
    >
      <button
        onClick={onToggle}
        className="absolute right-0 top-4 transform translate-x-1/2 bg-white rounded-full p-1.5 border border-gray-200 text-gray-500 hover:text-gray-700"
      >
        <BiMenu size={20} />
      </button>

      <div className="p-4">
        <img
          src="/logo.svg"
          alt="Sentinel Flash"
          className={`h-8 ${isExpanded ? 'w-auto' : 'w-8'}`}
        />
      </div>

      <div className="flex-1 px-2 py-4 space-y-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`
            }
          >
            <Icon size={24} />
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-3 font-medium"
              >
                {label}
              </motion.span>
            )}
          </NavLink>
        ))}

        <div className="pt-4 mt-4 border-t border-gray-200">
          <button
            onClick={() => setShowWatchlist(true)}
            className="nav-link w-full flex justify-start text-gray-600 hover:bg-gray-100"
          >
            <BiStar size={24} />
            {isExpanded && (
              <span className="ml-3 font-medium">
                Watchlist ({watchlist.length})
              </span>
            )}
          </button>

          <button
            className="nav-link w-full flex justify-start text-gray-600 hover:bg-gray-100 relative"
          >
            <BiBell size={24} />
            {hasActiveAlerts && (
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
            )}
            {isExpanded && (
              <span className="ml-3 font-medium">
                Alerts ({alerts.length})
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Watchlist Drawer */}
      <AnimatePresence>
        {showWatchlist && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Watchlist</h2>
              <button
                onClick={() => setShowWatchlist(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            {watchlist.map(stock => (
              <div
                key={stock.ticker}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{stock.name}</h3>
                    <p className="text-sm text-gray-500">{stock.ticker}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${
                      stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
