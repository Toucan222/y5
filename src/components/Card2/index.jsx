import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { BiSort, BiFilter } from 'react-icons/bi'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { stocks, metricLabels, benchmarks } from '../../data/stocks'
import { Tooltip } from '../shared/Tooltip'
import BenchmarkRow from './BenchmarkRow'

const Card2 = () => {
  const navigate = useNavigate()
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [filters, setFilters] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [showBenchmarks, setShowBenchmarks] = useState(true)

  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handleFilter = (key, value) => {
    setFilters(current => ({
      ...current,
      [key]: current[key] === value ? null : value
    }))
  }

  const filteredAndSortedStocks = useMemo(() => {
    let result = [...stocks]

    // Apply search filter
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase()
      result = result.filter(stock => 
        stock.name.toLowerCase().includes(lowercaseSearch) ||
        stock.ticker.toLowerCase().includes(lowercaseSearch)
      )
    }

    // Apply metric filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(stock => stock.metrics[key] >= value)
      }
    })

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue = a.metrics[sortConfig.key] || 0
        let bValue = b.metrics[sortConfig.key] || 0
        
        return sortConfig.direction === 'asc' 
          ? aValue - bValue 
          : bValue - aValue
      })
    }

    return result
  }, [stocks, sortConfig, filters, searchTerm])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full"
    >
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Stock Comparison</h1>
            <p className="mt-1 text-sm text-gray-500">Compare metrics across multiple stocks</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              onClick={() => setShowBenchmarks(!showBenchmarks)}
              className={`btn ${showBenchmarks ? 'btn-primary' : 'btn-secondary'}`}
            >
              {showBenchmarks ? 'Hide Benchmarks' : 'Show Benchmarks'}
            </button>
          </div>
        </header>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticker
                  </th>
                  {Object.entries(metricLabels).map(([key, label]) => (
                    <th
                      key={key}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center space-x-2">
                        <span>{label}</span>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleSort(key)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <BiSort size={16} />
                          </button>
                          <Tooltip content={`Filter by ${label}`}>
                            <button
                              onClick={() => handleFilter(key, 9)}
                              className={`${
                                filters[key] === 9 ? 'text-primary-600' : 'text-gray-400'
                              } hover:text-primary-700`}
                            >
                              <BiFilter size={16} />
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedStocks.map((stock) => (
                  <motion.tr
                    key={stock.ticker}
                    onClick={() => navigate('/', { state: { stock } })}
                    className="hover:bg-gray-50 cursor-pointer"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "tween", duration: 0.2 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-primary-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg font-semibold text-primary-700">
                            {stock.ticker.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {stock.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {stock.industry}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {stock.ticker}
                      </span>
                    </td>
                    {Object.keys(metricLabels).map(key => (
                      <td key={key} className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-900">
                            {stock.metrics[key]}
                          </span>
                          <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary-600 rounded-full transition-all duration-300"
                              style={{ width: `${(stock.metrics[key] / 10) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    ))}
                  </motion.tr>
                ))}
                {showBenchmarks && benchmarks.map(benchmark => (
                  <BenchmarkRow
                    key={benchmark.symbol}
                    benchmark={benchmark}
                    metricLabels={metricLabels}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Card2
