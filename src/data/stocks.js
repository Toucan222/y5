export const metricLabels = {
  profitability: 'Profitability',
  companyViability: 'Company Viability',
  marketPosition: 'Market Position',
  financialHealth: 'Financial Health',
  trackRecord: 'Track Record',
  revenueQuality: 'Revenue Quality',
  analystSentiment: 'Analyst Sentiment',
  capitalAllocation: 'Capital Allocation',
  outlook: 'Outlook',
  alignment: 'Alignment'
}

export const advancedMetrics = {
  peRatio: {
    label: 'P/E Ratio',
    description: 'Price to Earnings Ratio - A measure of company valuation',
    unit: 'x'
  },
  epsGrowth: {
    label: 'EPS Growth',
    description: 'Earnings Per Share Growth Rate',
    unit: '%'
  },
  debtToEquity: {
    label: 'Debt to Equity',
    description: 'Measure of financial leverage',
    unit: ''
  },
  freeCashFlow: {
    label: 'Free Cash Flow',
    description: 'Available cash after capital expenditures',
    unit: 'B'
  },
  operatingMargin: {
    label: 'Operating Margin',
    description: 'Profitability metric showing operational efficiency',
    unit: '%'
  }
}

export const stocks = [
  {
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
  },
  {
    name: 'Microsoft',
    ticker: 'MSFT',
    ceo: 'Satya Nadella',
    hq: 'Redmond, WA',
    industry: 'Software',
    metrics: {
      profitability: 9,
      companyViability: 10,
      marketPosition: 9,
      financialHealth: 10,
      trackRecord: 9,
      revenueQuality: 9,
      analystSentiment: 8,
      capitalAllocation: 9,
      outlook: 9,
      alignment: 8
    },
    advancedMetrics: {
      peRatio: '35.7',
      epsGrowth: '14.8',
      debtToEquity: '0.8',
      freeCashFlow: '87.74',
      operatingMargin: '42.1'
    },
    predictions: {
      bear: -2,
      bearPoints: ['Cloud competition intensifies', 'Enterprise spending slowdown'],
      base: 3,
      basePoints: ['Steady cloud growth', 'AI integration success'],
      bull: 9,
      bullPoints: ['AI leadership accelerates', 'Gaming division exceeds expectations']
    },
    factors: {
      value: 58,
      growth: 88,
      momentum: 82,
      quality: 95
    }
  }
]

export const benchmarks = [
  {
    name: 'S&P 500',
    symbol: 'SPX',
    metrics: {
      profitability: 7,
      companyViability: 8,
      marketPosition: 7,
      financialHealth: 8,
      trackRecord: 8,
      revenueQuality: 7,
      analystSentiment: 7,
      capitalAllocation: 7,
      outlook: 7,
      alignment: 7
    }
  },
  {
    name: 'Nasdaq 100',
    symbol: 'NDX',
    metrics: {
      profitability: 8,
      companyViability: 8,
      marketPosition: 8,
      financialHealth: 8,
      trackRecord: 8,
      revenueQuality: 8,
      analystSentiment: 8,
      capitalAllocation: 8,
      outlook: 8,
      alignment: 8
    }
  }
]
