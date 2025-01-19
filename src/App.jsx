import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/shared/Layout'
import Card1 from './components/Card1'
import Card2 from './components/Card2'
import Card3 from './components/Card3'

function App() {
  const location = useLocation()

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Card1 />} />
          <Route path="/card2" element={<Card2 />} />
          <Route path="/card3" element={<Card3 />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

export default App
