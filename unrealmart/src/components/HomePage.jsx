import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext'
import AiAssistant from './AiAssistant'
import ParallaxStars from './ParallaxStars'
import TronGrid from './TronGrid'
import GlowParticles from './GlowParticles'
import AnimatedPortal from './AnimatedPortal'

export default function HomePage() {
	const navigate = useNavigate()
	const { settings } = useSettings()
	const isDark = settings.theme === 'dark'

	return (
		<div
			className={`relative min-h-screen ${
				isDark
					? 'bg-gradient-to-br from-black via-purple-950 to-purple-800 text-white'
					: 'bg-gradient-to-br from-white via-purple-100 to-purple-200 text-black'
			} flex flex-col items-center justify-center overflow-hidden p-6 transition-colors duration-700`}
		>
			{/* 🔭 ФОН - слои внизу */}
			<ParallaxStars />
			<TronGrid />
			<GlowParticles />

			{/* 🌀 ПОРТАЛ */}
			<AnimatedPortal />

			{/* 🌌 ЗАГОЛОВОК */}
			<motion.h1
				className={`text-[2.8rem] md:text-[4rem] font-extrabold tracking-wide text-center neon-soft z-10 ${
					isDark ? 'text-white' : 'text-black'
				}`}
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				UNREALMART
			</motion.h1>

			{/* ✨ ПОДЗАГОЛОВОК */}
			<motion.p
				className='text-lg md:text-xl text-purple-400 text-center mb-10 z-10'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.4 }}
			>
				Портал в торговлю будущего, управляемую ИИ
			</motion.p>

			{/* 🚀 КНОПКИ */}
			<motion.div
				className='z-10 flex flex-col md:flex-row gap-4 text-lg font-medium'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 2 }}
			>
				<button
					onClick={() => navigate('/shop')}
					className='transition-transform duration-200 ease-out bg-purple-700 hover:bg-purple-900 text-white py-3 px-8 rounded-xl shadow-xl backdrop-blur-md border border-white/20'
				>
					🚀 Начать путешествие
				</button>
				<button
					onClick={() => navigate('/ai-lab')}
					className='transition-transform duration-200 ease-out bg-purple-900 hover:bg-purple-800 text-white py-3 px-8 rounded-xl shadow-xl border border-purple-500'
				>
					🧠 AI-Лаборатория
				</button>
				<button
					onClick={() => navigate('/vision')}
					className='transition-transform duration-200 ease-out bg-purple-700 hover:bg-purple-900 text-white py-3 px-8 rounded-xl shadow-xl border border-purple-400'
				>
					👁️ AI-Видение
				</button>
			</motion.div>

			{/* 🤖 AI-АССИСТЕНТ */}
			<AiAssistant />
		</div>
	)
}
