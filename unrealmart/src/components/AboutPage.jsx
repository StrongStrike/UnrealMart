import { motion } from 'framer-motion'

const timeline = [
	{
		year: '2023',
		title: 'Идея, родившаяся в коде',
		description:
			'UnrealMart начался как мечта — объединить AI и торговлю в одном портале.',
	},
	{
		year: '2024',
		title: 'Появление первого AI-консультанта',
		description:
			'Мы внедрили GPT и Vision, чтобы давать рекомендации и распознавать товары.',
	},
	{
		year: '2025',
		title: 'AR/VR и Web3-интеграция',
		description:
			'Пользователи получили опыт погружения в метавселенную покупок.',
	},
]

export default function AboutPage() {
	return (
		<div className='min-h-screen bg-white text-black dark:bg-gradient-to-b dark:from-black dark:to-purple-900 dark:text-white px-6 py-20 relative overflow-hidden transition-colors duration-500'>
			{/* Грид фоновая сетка Tron */}
			<div className='absolute inset-0 pointer-events-none z-0 opacity-5 bg-[radial-gradient(circle_at_center,_#a855f7_1px,_transparent_1px)] bg-[size:18px_18px]' />

			{/* Заголовок */}
			<motion.h1
				className='text-5xl md:text-6xl font-extrabold text-center mb-24 tracking-widest relative z-10'
				initial={{ opacity: 0, y: -30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				О ПРОЕКТЕ
			</motion.h1>

			{/* Таймлайн */}
			<div className='relative z-10 max-w-4xl mx-auto space-y-20 before:absolute before:left-2 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-purple-500/70 before:to-purple-800/70 before:rounded-full'>
				{timeline.map((item, i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, y: 60 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: i * 0.2 }}
						viewport={{ once: true }}
						className='relative pl-10 group'
					>
						{/* Свечение точки */}
						<div className='absolute left-0 top-1 w-4 h-4 bg-purple-500 rounded-full shadow-xl group-hover:scale-125 transition-transform' />
						<p className='text-purple-500 font-mono text-sm'>{item.year}</p>
						<h2 className='text-2xl font-bold mb-1 group-hover:text-purple-400 transition-colors'>
							{item.title}
						</h2>
						<p className='text-purple-300'>{item.description}</p>
					</motion.div>
				))}
			</div>

			{/* Миссия */}
			<motion.div
				className='mt-32 text-center max-w-3xl mx-auto relative z-10'
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
				viewport={{ once: true }}
			>
				<h3 className='text-3xl font-semibold mb-4 text-purple-500 dark:text-purple-300'>
					Миссия UnrealMart
				</h3>
				<p className='text-lg text-gray-800 dark:text-purple-100'>
					Создать пространство, где интеллект и технологии служат удобству,
					стилю и инновациям в каждой покупке.
				</p>
				<p className='mt-6 italic text-purple-600 dark:text-purple-400'>
					"Мы не просто продаём — мы открываем будущее."
				</p>
			</motion.div>
		</div>
	)
}
