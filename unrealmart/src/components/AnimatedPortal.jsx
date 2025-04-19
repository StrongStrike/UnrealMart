import { motion } from 'framer-motion'
import logo from '../assets/logo.png'
import { useSettings } from '../context/SettingsContext'

export default function AnimatedPortal() {
	const { settings } = useSettings()
	const isDark = settings.theme === 'dark'

	return (
		<motion.div
			className='relative z-10 mb-8 flex items-center justify-center'
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			transition={{ duration: 1.8, ease: 'easeOut' }}
		>
			{/* Пульсирующие круги */}
			<div className='absolute w-44 h-44 rounded-full border-4 border-purple-500/30 animate-ping' />
			<div className='absolute w-52 h-52 rounded-full border-2 border-purple-400/20 animate-pulse' />

			{/* Вращающийся логотип */}
			<motion.div
				className='rounded-full flex items-center justify-center bg-purple-400/10 backdrop-blur-md shadow-inner shadow-purple-500/20 border border-purple-500/30 p-6'
				animate={{ rotate: 360 }}
				transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
			>
				<img
					src={logo}
					alt='UnrealMart Logo'
					className='w-20 h-20 drop-shadow-md saturate-150'
				/>
			</motion.div>

			{/* Glow внутри */}
			<div className='absolute w-44 h-44 rounded-full bg-purple-500 blur-2xl opacity-20 pointer-events-none' />
		</motion.div>
	)
}
