import { useState } from 'react'

const initialAlerts = [
  {
    id: 1,
    ticker: 'AAPL',
    type: 'price',
    condition: 'above',
    value: 190,
    triggered: true,
    acknowledged: false
  },
  {
    id: 2,
    ticker: 'AAPL',
    type: 'metric',
    metric: 'profitability',
    condition: 'below',
    value: 9,
    triggered: true,
    acknowledged: false
  }
]

export function useAlerts() {
  const [alerts, setAlerts] = useState(initialAlerts)

  const addAlert = (alert) => {
    setAlerts([...alerts, { ...alert, id: Date.now(), triggered: false, acknowledged: false }])
  }

  const removeAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id))
  }

  const acknowledgeAlert = (id) => {
    setAlerts(alerts.map(a => 
      a.id === id ? { ...a, acknowledged: true } : a
    ))
  }

  return {
    alerts,
    addAlert,
    removeAlert,
    acknowledgeAlert
  }
}
