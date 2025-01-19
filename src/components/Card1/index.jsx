import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import CompanyInfo from './CompanyInfo'
import AudioPlayer from './AudioPlayer'
import Scorecard from './Scorecard'
import Predictions from './Predictions'
import HistoricalChart from './HistoricalChart'
import InsightsPanel from './InsightsPanel'
import AlertsPanel from './AlertsPanel'
import FactorAnalysis from './FactorAnalysis'
import FinancialSnapshot from './FinancialSnapshot'
import NewsTicker from './NewsTicker'
import { useWatchlist } from '../../hooks/useWatchlist'

const defaultStock = {
  name: 'Apple Inc',
  ticker: 'AAPL',
  ceo: 'Tim Cook',
  hq: 'Cupertino, CA',
  industry: 'Consumer Electronics',
  metrics: {
    profitability: 10,
    companyViability: 10,
    marketPosition: 10,
    financialHealth: 10,
    trackRecord: 9,
    revenueQuality: 9,
    analystSentiment: 9,
    capitalAllocation: 9,
    outlook: 9,
    alignment: 8
  },
  advancedMetrics: {
    peRatio: '28.5',
    epsGrowth: '12.3',
    debtToEquity: '1.2',
    freeCashFlow: '92.95',
    operatingMargin: '30.2'
  },
  predictions: {
    bear: -3,
    bearPoints: ['Market share loss in key segments', 'Margin pressure from competition'],
    base: 2,
    basePoints: ['Stable growth in services', 'Continued premium positioning'],
    bull: 8,
    bullPoints: ['AR/VR device launches spark new product category', 'Services revenue leaps from streaming']
  },
  historicalData: [
    { date: '2023-01', price: 150.23 },
    { date: '2023-02', price: 155.48 },
    { date: '2023-03', price: 157.65 },
    { date: '2023-04', price: 169.59 },
    { date: '2023-05', price: 173.75 },
    { date: '2023-06', price: 180.95 },
    { date: '2023-07', price: 178.85 },
    { date: '2023-08', price: 182.34 },
    { date: '2023-09', price: 175.49 },
    { date: '2023-10', price: 170.77 },
    { date: '2023-11', price: 189.69 },
    { date: '2023-12', price: 193.58 }
  ],
  factors: {
    value: 65,
    growth: 85,
    momentum: 78,
    quality: 92
  },
  financials: {
    years: ['2021', '2022', '2023'],
    income: {
      '2021': {
        revenue: 365817000000,
        grossProfit: 152836000000,
        operatingIncome: 108949000000,
        netIncome: 94680000000,
        eps: 5.61
      }
    },
    balance: {
      '2021': {
        totalAssets: 351002000000,
        totalLiabilities: 287912000000,
        equity: 63090000000,
        cash: 34940000000,
        debt: 124719000000
      }
    },
    cash: {
      '2021': {
        operatingCashFlow: 104038000000,
        investingCashFlow: -14545000000,
        financingCashFlow: -93353000000,
        freeCashFlow: 92953000000,
        capex: -11085000000
      }
    }
  },
  news: [
    {
      id: 1,
      date: '2024-01-20',
      headline: 'Apple Vision Pro pre-orders begin, shipping February 2nd',
      url: '#'
    }
  ],
  events: [
    {
      id: 1,
      date: '2024-02-01',
      title: 'Q1 2024 Earnings Release'
    }
  ]
}

const Card1 = () => {
  const location = useLocation()
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  const [collapsedSections, setCollapsedSections] = useState([])
  const stockData = location.state?.stock || defaultStock

  const toggleSection = (sectionId) => {
    setCollapsedSections(current =>
      current.includes(sectionId)
        ? current.filter(id => id !== sectionId)
        : [...current, sectionId]
    )
  }

  const renderSection = (sectionId, content) => {
    const isCollapsed = collapsedSections.includes(sectionId)
    
    return (
      <div className="card p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-inter font-medium text-gray-900">
            {sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}
          </h3>
          <button
            onClick={() => toggleSection(sectionId)}
            className="text-gray-400 hover:text-gray-600"
          >
            {isCollapsed ? '+' : '-'}
          </button>
        </div>
        <motion.div
          initial={false}
          animate={{ height: isCollapsed ? 0 : 'auto', opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          {content}
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-inter font-semibold text-gray-900">
            Stock Analysis
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Comprehensive analysis and predictions for {stockData.name}
          </p>
        </div>
        <button
          onClick={() => isInWatchlist(stockData.ticker) 
            ? removeFromWatchlist(stockData.ticker)
            : addToWatchlist(stockData)
          }
          className={`btn ${
            isInWatchlist(stockData.ticker)
              ? 'btn-secondary'
              : 'btn-primary'
          }`}
        >
          {isInWatchlist(stockData.ticker) ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </button>
      </header>

      {renderSection('insights', <InsightsPanel currentStock={stockData} />)}
      {renderSection('company', <CompanyInfo stock={stockData} />)}
      {renderSection('audio', <AudioPlayer />)}
      {renderSection('metrics', (
        <div className="space-y-6">
          <Scorecard 
            metrics={stockData.metrics} 
            advancedData={stockData.advancedMetrics}
          />
          <AlertsPanel stock={stockData} />
        </div>
      ))}
      {renderSection('factors', <FactorAnalysis stock={stockData} />)}
      {renderSection('financials', <FinancialSnapshot financials={stockData.financials} />)}
      {renderSection('predictions', <Predictions predictions={stockData.predictions} />)}
      {renderSection('chart', <HistoricalChart historicalData={stockData.historicalData} />)}
      {renderSection('news', <NewsTicker stock={stockData} />)}
    </div>
  )
}

export default Card1
