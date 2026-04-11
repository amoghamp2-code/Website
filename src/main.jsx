import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import CareerAnalyzer from './pages/CareerAnalyzer.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route path="/career-analyzer" element={<CareerAnalyzer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
