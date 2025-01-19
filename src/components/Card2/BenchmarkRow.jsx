import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '../shared/Tooltip'

export default function BenchmarkRow({ benchmark, metricLabels }) {
  return (
    <tr className="bg-gray-50 border-t-2 border-b-2 border-gray-200">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-lg font-semibold text-gray-600">
              {benchmark.symbol.charAt(0)}
            </span>
          </div>
          <div className="ml-4">
            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium text-gray-900">
                {benchmark.name}
              </div>
              <Tooltip content="Market benchmark for comparison">
                <InformationCircleIcon className="h-4 w-4 text-gray-400" />
              </Tooltip>
            </div>
            <div className="text-sm text-gray-500">
              {benchmark.symbol}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Benchmark
        </span>
      </td>
      {Object.keys(metricLabels).map(key => (
        <td key={key} className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-900">
              {benchmark.metrics[key]}
            </span>
            <div className="flex-grow h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-400 rounded-full transition-all duration-300"
                style={{ width: `${(benchmark.metrics[key] / 10) * 100}%` }}
              />
            </div>
          </div>
        </td>
      ))}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Market Average</span>
        </div>
      </td>
    </tr>
  )
}
