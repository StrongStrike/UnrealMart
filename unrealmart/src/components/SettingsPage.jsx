import { motion } from 'framer-motion'
import { useSettings } from '../context/SettingsContext'

const labels = {
	sound: '🎧 Звук',
	magnetic: '🧲 Магнитный курсор',
	ai: '🧠 AI Модули',
	theme: '🌗 Тема',
	animations: '🌀 Анимации',
}

export default function SettingsPage() {
	const { settings, toggle } = useSettings()

	return (
		<div className='min-h-screen bg-gradient-to-br from-white to-purple-100 dark:from-black dark:to-purple-950 text-black dark:text-white px-6 py-16 transition-colors duration-500'>
			<motion.h1
				className='text-5xl font-extrabold text-center mb-16 tracking-widest'
				initial={{ opacity: 0, y: -30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				⚙️ НАСТРОЙКИ
			</motion.h1>

			<div className='max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
				{Object.entries(settings).map(([key, value], i) => (
					<motion.div
						key={key}
						className='flex justify-between items-center bg-black/5 dark:bg-white/5 border border-purple-500/20 rounded-xl p-5 shadow-lg backdrop-blur-md transition'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: i * 0.1 }}
					>
						<div className='text-lg font-semibold'>{labels[key]}</div>

						{/* TOGGLE SWITCH */}
						<button
							onClick={() => toggle(key)}
							className={`w-16 h-8 flex items-center rounded-full px-1 transition-colors duration-300 ${
								(key === 'theme' ? settings[key] === 'dark' : settings[key])
									? 'bg-purple-600'
									: 'bg-purple-900'
							}`}
						>
							<div
								className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
									(key === 'theme' ? settings[key] === 'dark' : settings[key])
										? 'translate-x-8'
										: 'translate-x-0'
								}`}
							></div>
						</button>
					</motion.div>
				))}
			</div>
		</div>
	)
}
