import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

export default function ProductDescriptionGen() {
	const [features, setFeatures] = useState('')
	const [result, setResult] = useState('')
	const [loading, setLoading] = useState(false)

	const handleGenerate = async () => {
		if (!features.trim()) return

		setLoading(true)
		setResult('⏳ AI пишет описание...')

		try {
			const res = await axios.post(
				'https://openrouter.ai/api/v1/chat/completions',
				{
					model: 'gpt-3.5-turbo',
					messages: [
						{
							role: 'system',
							content:
								'Ты — маркетолог. Создавай привлекательные описания товаров на основе их параметров.',
						},
						{
							role: 'user',
							content: `Создай маркетинговое описание для товара с такими характеристиками: ${features}`,
						},
					],
					temperature: 0.8,
					max_tokens: 200,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization:
							'Bearer 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',
					},
				}
			)

			const text = res.data.choices[0].message.content
			setResult(`📝 ${text}`)
		} catch (err) {
			setResult('❌ Ошибка при генерации')
			console.error(err)
		}

		setLoading(false)
	}

	return (
		<div className='min-h-screen bg-gradient-to-b from-white to-purple-100 dark:from-black dark:to-gray-900 text-black dark:text-white flex flex-col items-center justify-center p-6 transition-colors duration-500'>
			<motion.h2
				className='text-4xl font-extrabold tracking-wide mb-8 text-center'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				🎨 Генератор описания товара
			</motion.h2>

			<textarea
				value={features}
				onChange={e => setFeatures(e.target.value)}
				placeholder='Например: беспроводные наушники, шумоподавление, до 100$, лёгкие'
				className='w-full max-w-2xl h-32 p-4 rounded-xl bg-white dark:bg-white/10 text-black dark:text-white focus:outline-none border border-purple-400/20 shadow-inner resize-none mb-4'
			/>

			<motion.button
				onClick={handleGenerate}
				className='bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition'
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				disabled={loading}
			>
				{loading ? '🤖 AI пишет...' : '🚀 Сгенерировать описание'}
			</motion.button>

			{result && (
				<motion.div
					className='mt-8 bg-white/20 dark:bg-white/10 border border-purple-400/30 backdrop-blur-lg p-6 rounded-xl max-w-2xl text-lg shadow-xl'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
				>
					{result}
				</motion.div>
			)}
		</div>
	)
}
