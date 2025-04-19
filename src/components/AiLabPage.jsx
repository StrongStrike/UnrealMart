import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useSettings } from '../context/SettingsContext'

export default function AiLabPage() {
	const [question, setQuestion] = useState('')
	const [answer, setAnswer] = useState('')
	const [loading, setLoading] = useState(false)
	const answerRef = useRef(null)
	const { settings } = useSettings()

	const handleAsk = async () => {
		if (!question.trim()) return

		setLoading(true)
		setAnswer('🤖 AI думает...')

		try {
			const res = await axios.post(
				'https://openrouter.ai/api/v1/chat/completions',
				{
					model: 'gpt-3.5-turbo',
					messages: [
						{
							role: 'system',
							content:
								'Ты — AI-консультант UnrealMart. Помогай подбирать лучшие товары.',
						},
						{ role: 'user', content: question },
					],
					temperature: 0.7,
					max_tokens: 100,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization:
							'Bearer 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',
					},
				}
			)

			const gptReply = res.data.choices[0].message.content
			setAnswer(`🧠 AI: ${gptReply}`)
		} catch (err) {
			setAnswer('❌ Ошибка при получении ответа от AI')
			console.error(err)
		}

		setLoading(false)
	}

	useEffect(() => {
		if (answerRef.current) {
			answerRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [answer])

	const isDark = settings.theme === 'dark'
	const bg = isDark
		? 'from-gray-900 to-black text-white'
		: 'from-white to-gray-100 text-black'

	return (
		<div
			className={`min-h-screen bg-gradient-to-b ${bg} flex flex-col items-center justify-center p-6 transition-all`}
		>
			<motion.h1
				className='text-4xl md:text-5xl font-bold tracking-widest mb-6'
				initial={{ opacity: 0, y: -40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				🧪 AI-Лаборатория
			</motion.h1>

			<input
				value={question}
				onChange={e => setQuestion(e.target.value)}
				placeholder='Что ты ищешь? Например: бюджетный ноутбук для учёбы'
				className='w-full max-w-xl p-3 rounded-xl text-black focus:outline-none mb-4 shadow-lg'
			/>

			<motion.button
				onClick={handleAsk}
				className='bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-xl shadow-md'
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				disabled={loading}
			>
				{loading ? 'AI думает...' : 'Спросить AI'}
			</motion.button>

			{answer && (
				<motion.div
					ref={answerRef}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className={`mt-8 p-4 rounded-xl max-w-xl text-lg border shadow-md ${
						isDark
							? 'bg-white/10 border-purple-500 text-purple-100'
							: 'bg-purple-100 text-purple-900 border-purple-300'
					}`}
				>
					{answer}
				</motion.div>
			)}
		</div>
	)
}
