import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BellIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useAlerts } from '../../hooks/useAlerts'

export default function AlertsPanel({ stock }) {
  const { alerts, addAlert } = useAlerts()
  const [showAddAlert, setShowAddAlert] = useState(false)
  const [newAlert, setNewAlert] = useState({
    type: 'price',
    condition: 'above',
    value: ''
  })

  const stockAlerts = alerts.filter(alert => alert.ticker === stock.ticker)

  const handleAddAlert = () => {
    addAlert({
      ticker: stock.ticker,
      ...newAlert
    })
    setShowAddAlert(false)
    setNewAlert({ type: 'price', condition: 'above', value: '' })
  }

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <BellIcon className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium text-gray-900">Alerts</h3>
        </div>
        <button
          onClick={() => setShowAddAlert(!showAddAlert)}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {showAddAlert && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Alert Type
                  </label>
                  <select
                    value={newAlert.type}
                    onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value })}
                    className="input mt-1"
                  >
                    <option value="price">Price</option>
                    <option value="metric">Metric</option>
                  </select>
                </div>

                {newAlert.type === 'metric' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Metric
                    </label>
                    <select
                      value={newAlert.metric}
                      onChange={(e) => setNewAlert({ ...newAlert, metric: e.target.value })}
                      className="input mt-1"
                    >
                      <option value="profitability">Profitability</option>
                      <option value="marketPosition">Market Position</option>
                      <option value="financialHealth">Financial Health</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Condition
                  </label>
                  <select
                    value={newAlert.condition}
                    onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value })}
                    className="input mt-1"
                  >
                    <option value="above">Above</option>
                    <option value="below">Below</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Value
                  </label>
                  <input
                    type="number"
                    value={newAlert.value}
                    onChange={(e) => setNewAlert({ ...newAlert, value: e.target.value })}
                    className="input mt-1"
                  />
                </div>

                <button
                  onClick={handleAddAlert}
                  className="btn btn-primary w-full"
                >
                  Add Alert
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        {stockAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-lg border ${
              alert.triggered && !alert.acknowledged
                ? 'bg-red-50 border-red-100'
                : 'bg-gray-50 border-gray-100'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {alert.type === 'price' ? 'Price' : alert.metric}{' '}
                  {alert.condition} {alert.value}
                </p>
                {alert.triggered && !alert.acknowledged && (
                  <p className="text-sm text-red-600 mt-1">
                    Triggered
                  </p>
                )}
              </div>
              <button
                onClick={() => removeAlert(alert.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
