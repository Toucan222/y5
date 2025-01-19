import React, { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const formatNumber = (num) => {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`
  return `$${num.toLocaleString()}`
}

export default function FinancialSnapshot({ financials }) {
  const [activeTab, setActiveTab] = useState('income')

  const tabs = {
    income: 'Income Statement',
    balance: 'Balance Sheet',
    cash: 'Cash Flow'
  }

  const metrics = {
    income: [
      { label: 'Revenue', key: 'revenue' },
      { label: 'Gross Profit', key: 'grossProfit' },
      { label: 'Operating Income', key: 'operatingIncome' },
      { label: 'Net Income', key: 'netIncome' },
      { label: 'EPS', key: 'eps', format: (num) => `$${num.toFixed(2)}` }
    ],
    balance: [
      { label: 'Total Assets', key: 'totalAssets' },
      { label: 'Total Liabilities', key: 'totalLiabilities' },
      { label: "Shareholders' Equity", key: 'equity' },
      { label: 'Cash & Equivalents', key: 'cash' },
      { label: 'Total Debt', key: 'debt' }
    ],
    cash: [
      { label: 'Operating Cash Flow', key: 'operatingCashFlow' },
      { label: 'Investing Cash Flow', key: 'investingCashFlow' },
      { label: 'Financing Cash Flow', key: 'financingCashFlow' },
      { label: 'Free Cash Flow', key: 'freeCashFlow' },
      { label: 'Capital Expenditure', key: 'capex' }
    ]
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-4 border-b border-gray-200">
        {Object.entries(tabs).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`pb-2 text-sm font-medium border-b-2 -mb-px ${
              activeTab === key
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Metric
              </th>
              {financials.years.map(year => (
                <th key={year} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {year}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {metrics[activeTab].map(({ label, key, format = formatNumber }) => (
              <tr key={key} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-900">
                  {label}
                </td>
                {financials.years.map(year => (
                  <td key={year} className="px-4 py-2 text-sm text-gray-900 font-mono">
                    {format(financials[activeTab][year]?.[key] || 0)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
