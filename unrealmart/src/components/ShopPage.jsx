import { useEffect, useState } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useSettings } from '../context/SettingsContext'

const categories = ['Все', 'AR/VR', 'Гаджеты', 'AI', 'NFT']

const products = [
	{
		id: 1,
		title: 'AR-Очки FutureX',
		description: 'Погружение в дополненную реальность нового поколения',
		details:
			'Эти очки поддерживают Eye Tracking, VR Overlay и нейроуправление.',
		price: '₽ 79 990',
		image: '/products/ar-glasses.jpg',
		tag: 'AR/VR',
	},
	{
		id: 2,
		title: 'Голографическая колонка',
		description: 'Визуализируй музыку как никогда раньше',
		details:
			'Поддержка 3D визуализаций звука. Bluetooth 5.3. Интеграция с Unreal AI.',
		price: '₽ 29 990',
		image: '/products/holo-speaker.jpg',
		tag: 'Гаджеты',
	},
	{
		id: 3,
		title: 'Unreal AI Cube',
		description: 'Настольный помощник с голосом и характером',
		details: 'AI-интерфейс с голосовым вводом и реакцией на настроение.',
		price: '₽ 49 990',
		image: '/products/ai-cube.jpg',
		tag: 'AI',
	},
]

const fadeInUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

function ProductCard({ product, onClick }) {
	const controls = useAnimation()
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

	useEffect(() => {
		if (inView) controls.start('visible')
	}, [inView, controls])

	return (
		<motion.div
			ref={ref}
			initial='hidden'
			animate={controls}
			variants={fadeInUp}
			whileHover={{ scale: 1.03, rotate: 0.5 }}
			whileTap={{ scale: 0.97 }}
			onClick={() => onClick(product)}
			className='group transition relative bg-white/5 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-5 shadow-xl hover:shadow-purple-500/30 cursor-pointer overflow-hidden'
		>
			<img
				src={product.image}
				alt={product.title}
				className='w-full h-48 object-cover rounded-xl mb-4 group-hover:brightness-110 transition'
			/>
			<h2 className='text-xl font-bold'>{product.title}</h2>
			<p className='text-sm text-purple-500 dark:text-purple-300 mb-2'>
				{product.description}
			</p>
			<p className='text-lg font-semibold text-purple-600 dark:text-purple-400'>
				{product.price}
			</p>
			<div className='absolute inset-0 bg-purple-500/5 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none rounded-2xl' />
		</motion.div>
	)
}

export default function ShopPage() {
	const [activeCategory, setActiveCategory] = useState('Все')
	const [search, setSearch] = useState('')
	const [sortOption, setSortOption] = useState('default')
	const [selectedProduct, setSelectedProduct] = useState(null)
	const { settings } = useSettings()
	const themeClass =
		settings.theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'

	const filtered = products.filter(p => {
		const matchesCategory = activeCategory === 'Все' || p.tag === activeCategory
		const matchesSearch =
			p.title.toLowerCase().includes(search.toLowerCase()) ||
			p.description.toLowerCase().includes(search.toLowerCase())
		return matchesCategory && matchesSearch
	})

	const sorted = [...filtered].sort((a, b) => {
		if (sortOption === 'price-asc')
			return (
				parseInt(a.price.replace(/[₽\s]/g, '')) -
				parseInt(b.price.replace(/[₽\s]/g, ''))
			)
		if (sortOption === 'price-desc')
			return (
				parseInt(b.price.replace(/[₽\s]/g, '')) -
				parseInt(a.price.replace(/[₽\s]/g, ''))
			)
		return 0
	})

	return (
		<div className={`min-h-screen ${themeClass} p-10`}>
			<motion.h1
				className='text-4xl font-extrabold text-center mb-12 mt-8 tracking-wider'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				🛍️ Магазин UnrealMart
			</motion.h1>

			<div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-8 max-w-5xl mx-auto'>
				<input
					type='text'
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder='Поиск товаров...'
					className='px-4 py-2 rounded-lg text-black w-full md:w-1/2'
				/>

				<select
					value={sortOption}
					onChange={e => setSortOption(e.target.value)}
					className='text-black px-3 py-2 rounded-lg'
				>
					<option value='default'>Сортировка</option>
					<option value='price-asc'>Цена ↑</option>
					<option value='price-desc'>Цена ↓</option>
				</select>
			</div>

			<div className='flex gap-2 flex-wrap justify-center mb-10'>
				{categories.map((cat, i) => (
					<button
						key={i}
						onClick={() => setActiveCategory(cat)}
						className={`px-4 py-2 border text-sm rounded-full backdrop-blur-md transition duration-300 hover:bg-purple-700/20 hover:text-white ${
							activeCategory === cat
								? 'bg-purple-600 text-white border-purple-400'
								: 'border-purple-400 text-purple-800 dark:text-purple-200'
						}`}
					>
						{cat}
					</button>
				))}
			</div>

			<motion.div
				className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'
				key={activeCategory + search + sortOption}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4 }}
			>
				{sorted.map(product => (
					<ProductCard
						key={product.id}
						product={product}
						onClick={setSelectedProduct}
					/>
				))}
			</motion.div>

			<AnimatePresence>
				{selectedProduct && (
					<motion.div
						className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setSelectedProduct(null)}
					>
						<motion.div
							className='bg-gradient-to-br from-purple-900 to-purple-600 rounded-2xl p-6 max-w-lg w-full shadow-xl text-white relative'
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ type: 'spring', stiffness: 200, damping: 20 }}
							onClick={e => e.stopPropagation()}
						>
							<button
								className='absolute top-3 right-3 bg-purple-700 text-white px-3 py-1 rounded-full text-sm hover:bg-purple-800'
								onClick={() => setSelectedProduct(null)}
							>
								✖️ Закрыть
							</button>
							<img
								src={selectedProduct.image}
								alt={selectedProduct.title}
								className='w-full h-52 object-cover rounded-xl mb-4'
							/>
							<h2 className='text-2xl font-bold mb-2'>
								{selectedProduct.title}
							</h2>
							<p className='text-purple-300 mb-2'>{selectedProduct.price}</p>
							<p className='text-purple-100 text-sm mb-3'>
								{selectedProduct.description}
							</p>
							<p className='text-purple-200 text-sm italic'>
								{selectedProduct.details}
							</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
