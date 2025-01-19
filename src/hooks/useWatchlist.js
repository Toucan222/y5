import { useState } from 'react'

const initialWatchlist = [
  { 
    ticker: 'AAPL', 
    name: 'Apple Inc', 
    change: 2.5,
    alerts: ['Price above $190', 'Profitability score decreased']
  },
  { 
    ticker: 'MSFT', 
    name: 'Microsoft', 
    change: -1.2,
    alerts: ['New analyst rating']
  }
]

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState(initialWatchlist)

  const addToWatchlist = (stock) => {
    if (!watchlist.find(s => s.ticker === stock.ticker)) {
      setWatchlist([...watchlist, { ...stock, alerts: [] }])
    }
  }

  const removeFromWatchlist = (ticker) => {
    setWatchlist(watchlist.filter(s => s.ticker !== ticker))
  }

  const isInWatchlist = (ticker) => {
    return watchlist.some(s => s.ticker === ticker)
  }

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  }
}
