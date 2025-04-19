import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SettingsProvider } from './context/SettingsContext'
import HomePage from './components/HomePage'
import ShopPage from './components/ShopPage'
import Navbar from './components/Navbar'
import AiLabPage from './components/AiLabPage'
import ProductDescriptionGen from './components/ProductDescriptionGen'
import ImageAnalyzer from './components/ImageAnalyzer'
import AboutPage from './components/AboutPage'
import TeamPage from './components/TeamPage'
import PremiumPage from './components/PremiumPage'
import SettingsPage from './components/SettingsPage'
import React, { useEffect } from 'react'



function App() {
	return (
		<SettingsProvider>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/shop' element={<ShopPage />} />
					<Route path='/ai-lab' element={<AiLabPage />} />
					<Route
						path='/generate-description'
						element={<ProductDescriptionGen />}
					/>
					<Route path='/vision' element={<ImageAnalyzer />} />
					<Route path='/about' element={<AboutPage />} />
					<Route path='/team' element={<TeamPage />} />
					<Route path='/premium' element={<PremiumPage />} />
					<Route path='/settings' element={<SettingsPage />} />
				</Routes>
			</Router>
		</SettingsProvider>
	)
}


export default App