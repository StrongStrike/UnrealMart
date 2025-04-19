import { motion } from 'framer-motion'
import { useSettings } from '../context/SettingsContext'

const team = [
	{
		name: 'UnrealBot',
		role: 'AI-консультант',
		bio: 'Всегда рядом, чтобы подобрать идеальный товар. Общается на всех языках и предугадывает желания.',
		icon: '🤖',
	},
	{
		name: 'Vision',
		role: 'Аналитик будущего',
		bio: 'Понимает тренды до того, как они случились. Его прогнозы точнее погоды.',
		icon: '🧠',
	},
	{
		name: 'Gifter',
		role: 'Подарочный AI',
		bio: 'Подбирает идеальные подарки для любого случая, от Нового года до космической свадьбы.',
		icon: '🎁',
	},
]

export default function TeamPage() {
	const { settings } = useSettings()
	const isLight = settings.theme === 'light'

	return (
		<div
			className={`min-h-screen px-6 py-20 transition-colors duration-500 ${
				isLight
					? 'bg-gradient-to-br from-white to-purple-100 text-black'
					: 'bg-gradient-to-b from-black to-purple-900 text-white'
			}`}
		>
			<motion.h1
				className='text-5xl md:text-6xl font-extrabold text-center mb-16 tracking-widest'
				initial={{ opacity: 0, y: -30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				AI-КОМАНДА UNREALMART
			</motion.h1>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto'>
				{team.map((member, i) => (
					<motion.div
						key={i}
						className={`relative text-center border rounded-2xl p-6 shadow-lg backdrop-blur-md group transition-all duration-500 ${
							isLight
								? 'bg-white border-purple-200 hover:shadow-purple-300'
								: 'bg-white/5 border-purple-500/20 hover:shadow-purple-500/30'
						}`}
						initial={{ opacity: 0, y: 60 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: i * 0.2 }}
						whileHover={{ scale: 1.05 }}
					>
						<div className='text-6xl mb-4'>{member.icon}</div>
						<h2 className='text-2xl font-bold mb-1'>{member.name}</h2>
						<p
							className={`text-sm mb-4 ${
								isLight ? 'text-purple-700' : 'text-purple-300'
							}`}
						>
							{member.role}
						</p>
						<p className={isLight ? 'text-gray-700' : 'text-purple-200'}>
							{member.bio}
						</p>

						{/* glow on hover */}
						<div className='absolute inset-0 opacity-0 group-hover:opacity-10 bg-purple-500 blur-xl transition duration-500 rounded-2xl pointer-events-none'></div>
					</motion.div>
				))}
			</div>
		</div>
	)
}
