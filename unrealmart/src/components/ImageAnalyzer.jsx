import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useSettings } from '../context/SettingsContext'

export default function ImageAnalyzer() {
	const { settings } = useSettings()
	const [file, setFile] = useState(null)
	const [preview, setPreview] = useState(null)
	const [result, setResult] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const handleFileChange = e => {
		const img = e.target.files[0]
		if (img) {
			setFile(img)
			setPreview(URL.createObjectURL(img))
			setResult([])
			setError(null)
		}
	}

	const handleAnalyze = async () => {
		if (!file) return
		setLoading(true)
		setResult([])
		setError(null)

		const formData = new FormData()
		formData.append('image', file)

		try {
			const res = await axios.post('http://localhost:5000/analyze', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})

			setResult(res.data.detected || [])
		} catch (err) {
			console.error(err)
			setError('❌ Ошибка при анализе изображения')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div
			className={`min-h-screen ${
				settings.theme === 'dark'
					? 'bg-gradient-to-b from-gray-950 to-gray-900 text-white'
					: 'bg-gradient-to-b from-gray-100 to-white text-black'
			} flex flex-col items-center justify-center p-6 transition duration-500`}
		>
			<motion.h2
				className='text-4xl font-bold mb-6 tracking-widest text-center'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				🧠 AI-Видение UnrealMart
			</motion.h2>

			<input
				type='file'
				accept='image/*'
				onChange={handleFileChange}
				className='mb-6 text-sm text-purple-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-700 file:text-white hover:file:bg-purple-800 transition'
			/>

			{preview && (
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className='relative border-4 border-purple-700 rounded-xl overflow-hidden shadow-lg mb-6'
				>
					<img
						src={preview}
						alt='Предпросмотр'
						className='max-w-xs object-cover'
					/>
					<div className='absolute inset-0 border-2 border-white/20 rounded-xl pointer-events-none' />
				</motion.div>
			)}

			<motion.button
				onClick={handleAnalyze}
				disabled={loading}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className={`${
					loading ? 'opacity-50 cursor-not-allowed' : ''
				} bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-xl shadow-xl transition duration-300`}
			>
				{loading ? '🔄 AI анализирует...' : '🚀 Анализировать изображение'}
			</motion.button>

			{error && (
				<motion.p
					className='text-red-400 mt-6 text-sm italic'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					{error}
				</motion.p>
			)}

			{!loading && result.length === 0 && preview && !error && (
				<motion.p
					className='text-purple-400 mt-6 text-sm italic'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					Нажми «Анализировать изображение» — AI покажет, что он видит.
				</motion.p>
			)}

			{result.length > 0 && (
				<motion.div
					className='mt-10 bg-white/10 dark:bg-white/5 p-6 rounded-xl max-w-xl w-full shadow-lg backdrop-blur-md border border-purple-500'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
				>
					<h3 className='text-xl font-semibold mb-4 text-purple-300'>
						🔍 Обнаружено объектов: {result.length}
					</h3>
					<ul className='space-y-2 text-lg'>
						{result.map((item, idx) => (
							<li
								key={idx}
								className='bg-purple-800/30 hover:bg-purple-700/50 transition px-4 py-2 rounded-lg shadow text-white border border-purple-500'
							>
								⚡ {item}
							</li>
						))}
					</ul>
				</motion.div>
			)}
		</div>
	)
}
