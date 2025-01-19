import React from 'react'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '../shared/Tooltip'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler)

const factorDescriptions = {
  value: 'Measures like P/E ratio, P/B ratio, and dividend yield',
  growth: 'Revenue growth, earnings growth, and margin expansion',
  momentum: 'Price momentum, earnings momentum, and analyst revisions',
  quality: 'Profitability, financial health, and earnings stability'
}

export default function FactorAnalysis({ stock }) {
  const data = {
    labels: ['Value', 'Growth', 'Momentum', 'Quality'],
    datasets: [
      {
        data: [
          stock.factors?.value || 0,
          stock.factors?.growth || 0,
          stock.factors?.momentum || 0,
          stock.factors?.quality || 0
        ],
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(79, 70, 229, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(79, 70, 229, 1)'
      }
    ]
  }

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Factor Analysis</h3>
        <Tooltip content="Multi-factor analysis showing key investment characteristics">
          <InformationCircleIcon className="h-5 w-5 text-gray-400" />
        </Tooltip>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64">
          <Radar data={data} options={options} />
        </div>

        <div className="space-y-4">
          {Object.entries(factorDescriptions).map(([factor, description]) => (
            <div key={factor} className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {factor.charAt(0).toUpperCase() + factor.slice(1)}
                </span>
                <span className="text-sm font-semibold text-primary-600">
                  {stock.factors?.[factor] || 0}/100
                </span>
              </div>
              <div className="mt-1 h-1.5 bg-gray-200 rounded-full">
                <div
                  className="h-1.5 bg-primary-600 rounded-full"
                  style={{ width: `${stock.factors?.[factor] || 0}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
