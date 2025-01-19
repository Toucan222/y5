import React from 'react'
import { motion } from 'framer-motion'
import { LightBulbIcon } from '@heroicons/react/24/outline'
import { useWatchlist } from '../../hooks/useWatchlist'

export default function InsightsPanel({ currentStock }) {
  const { watchlist } = useWatchlist()

  // Generate insights based on watchlist and current stock
  const insights = React.useMemo(() => {
    const results = []

    // Compare with watchlist stocks
    watchlist.forEach(watchedStock => {
      if (watchedStock.ticker !== currentStock.ticker) {
        if (watchedStock.metrics?.profitability > currentStock.metrics?.profitability) {
          results.push({
            id: `${watchedStock.ticker}-prof`,
            type: 'comparison',
            content: `${watchedStock.ticker} has a higher profitability score (${watchedStock.metrics.profitability} vs ${currentStock.metrics.profitability})`
          })
        }
      }
    })

    // Add stock-specific insights
    if (currentStock.metrics?.profitability >= 9) {
      results.push({
        id: 'high-prof',
        type: 'highlight',
        content: `${currentStock.ticker} is in the top 10% for profitability`
      })
    }

    return results
  }, [watchlist, currentStock])

  if (!insights.length) return null

  return (
    <div className="bg-gradient-to-r from-primary-50 to-white border border-primary-100 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <LightBulbIcon className="h-5 w-5 text-primary-600" />
        <h3 className="font-medium text-primary-900">AI Insights</h3>
      </div>
      <div className="space-y-2">
        {insights.map((insight) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start space-x-2"
          >
            <span className="text-primary-600 mt-1">•</span>
            <p className="text-sm text-primary-800">{insight.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
