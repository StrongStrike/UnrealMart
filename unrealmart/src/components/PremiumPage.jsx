import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const premiumItems = [
	{
		name: 'Unreal CyberWatch X',
		desc: 'Часы с нейроинтерфейсом. Управляй жестами и мыслями.',
		image: '/premium/cyberwatch.jpg',
		price: '₿ 0.8 / ₽ 499 990',
		details:
			'Эти часы способны синхронизироваться с вашим мозговым интерфейсом и передавать сигналы в устройство. Возможность кастомизации интерфейса.',
		comment:
			'🧠 Подходит техноэнтузиастам, которые мыслят быстрее, чем говорят. UnrealBot рекомендует!',
	},
	{
		name: 'NFT-Маска Identity V4',
		desc: 'Анимированная AR-маска. Уникальный экземпляр с блокчейн-сертификатом.',
		image: '/premium/nft-mask.jpg',
		price: '₿ 1.2 / ₽ 749 990',
		details:
			'Каждая маска — уникальный NFT с AR-визуализацией. Встроена поддержка UnrealLens. Поставляется с цифровым паспортом NFT.',
		comment:
			'🎭 Эта маска подходит для цифровых художников и аватаров будущего. Одобрено UnrealBot.',
	},
	{
		name: 'Левитирующий Cube AI',
		desc: 'Искусственный интеллект в магнитной оболочке. Говорит. Думает. Светится.',
		image: '/premium/ai-cube-lev.jpg',
		price: '₿ 2.5 / ₽ 1 299 000',
		details:
			'Модель Vision-IX. Ответы на голос, реакции на прикосновения. Реагирует на настроение владельца с помощью анализа тона голоса.',
		comment:
			'🤖 Этот AI — не просто гаджет, а спутник вашего интеллекта. UnrealBot в восторге.',
	},
]

export default function PremiumPage() {
	const [selected, setSelected] = useState(null)

	return (
		<div className='min-h-screen bg-gradient-to-tr from-white to-purple-100 dark:from-black dark:to-purple-950 text-black dark:text-white px-6 py-16 transition-colors duration-500'>
			<motion.h1
				className='text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-widest'
				initial={{ opacity: 0, y: -30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				🎖️ UNREAL EXCLUSIVE
			</motion.h1>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto'>
				{premiumItems.map((item, i) => (
					<motion.div
						key={i}
						onClick={() => setSelected(item)}
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: i * 0.2 }}
						viewport={{ once: true }}
						className='relative bg-white/30 dark:bg-white/10 border border-purple-400/20 rounded-2xl p-6 backdrop-blur-xl shadow-xl hover:shadow-purple-500/30 hover:scale-105 transition-all duration-500 group overflow-hidden cursor-pointer'
					>
						<img
							src={item.image}
							alt={item.name}
							className='w-full h-52 object-cover rounded-xl mb-4 group-hover:brightness-105'
						/>
						<h2 className='text-2xl font-bold mb-2'>{item.name}</h2>
						<p className='text-purple-600 dark:text-purple-300 text-sm mb-3'>
							{item.desc}
						</p>
						<p className='text-xl font-semibold text-purple-700 dark:text-purple-200'>
							{item.price}
						</p>

						<div className='absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 blur-lg transition duration-500 pointer-events-none' />
					</motion.div>
				))}
			</div>

			<AnimatePresence>
				{selected && (
					<motion.div
						className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setSelected(null)}
					>
						<motion.div
							className='bg-white dark:bg-purple-900 text-black dark:text-white max-w-lg w-full rounded-2xl shadow-2xl p-6 relative cursor-default'
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							transition={{ type: 'spring', stiffness: 200, damping: 20 }}
							onClick={e => e.stopPropagation()}
						>
							<button
								onClick={() => setSelected(null)}
								className='absolute top-4 right-4 text-white bg-purple-700 hover:bg-purple-800 px-3 py-1 rounded-full text-xs'
							>
								Закрыть
							</button>
							<img
								src={selected.image}
								alt={selected.name}
								className='w-full h-56 object-cover rounded-xl mb-4'
							/>
							<h2 className='text-2xl font-bold'>{selected.name}</h2>
							<p className='text-purple-500 dark:text-purple-300 mb-2 font-medium'>
								{selected.price}
							</p>
							<p className='text-sm text-gray-700 dark:text-purple-100 mb-4'>
								{selected.details}
							</p>

							<div className='bg-purple-100/20 dark:bg-purple-500/10 border border-purple-400/20 rounded-xl p-4 text-sm font-mono text-purple-600 dark:text-purple-200'>
								<span className='block text-purple-500 font-bold mb-1'>
									💬 UnrealBot говорит:
								</span>
								<span>{selected.comment}</span>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
