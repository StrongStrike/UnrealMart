// src/context/SettingsContext.js
import { createContext, useContext, useEffect, useState } from 'react'

const defaultSettings = {
	sound: true,
	magnetic: true,
	ai: true,
	theme: 'dark',
	animations: true,
}

const SettingsContext = createContext()

export function SettingsProvider({ children }) {
	const [settings, setSettings] = useState(defaultSettings)

	useEffect(() => {
		const saved = localStorage.getItem('unreal-settings')
		if (saved) setSettings(JSON.parse(saved))
	}, [])

	useEffect(() => {
		localStorage.setItem('unreal-settings', JSON.stringify(settings))

		// ✅ Применяем тему надёжно
		const root = document.documentElement
		if (settings.theme === 'dark') {
			root.classList.add('dark')
			root.classList.remove('light')
			document.body.style.backgroundColor = '#000'
		} else {
			root.classList.remove('dark')
			root.classList.add('light')
			document.body.style.backgroundColor = '#f3f3f3'
		}
	}, [settings])


	const toggle = key => {
		setSettings(prev => ({
			...prev,
			[key]:
				key === 'theme'
					? prev[key] === 'dark'
						? 'light'
						: 'dark'
					: !prev[key],
		}))
	}

	return (
		<SettingsContext.Provider value={{ settings, toggle }}>
			{children}
		</SettingsContext.Provider>
	)
}

export const useSettings = () => useContext(SettingsContext)
