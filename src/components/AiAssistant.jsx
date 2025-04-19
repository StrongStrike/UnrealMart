import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

export default function AiAssistant() {
	const [speaking, setSpeaking] = useState(false)

	const speak = text => {
		window.speechSynthesis.cancel() // 💡 предотвращаем наложение
		const utter = new SpeechSynthesisUtterance(text)
		utter.lang = 'ru-RU'
		utter.pitch = 1.1
		utter.rate = 1
		utter.volume = 1
		setSpeaking(true)
		utter.onend = () => setSpeaking(false)
		window.speechSynthesis.speak(utter)
	}

	useEffect(() => {
		speak(
			'Добро пожаловать в UnrealMart. Я — ваш цифровой помощник. Готов открыть портал?'
		)
	}, [])

	return (
		<motion.div
			className='fixed bottom-6 right-6 md:right-10 bg-white dark:bg-purple-900/70 text-black dark:text-purple-100 border border-purple-400/40 dark:border-purple-400 backdrop-blur-md shadow-xl rounded-xl p-4 max-w-xs z-50'
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 2 }}
		>
			<div className='flex items-start gap-3'>
				<div className='bg-purple-500 text-white rounded-full p-2 shadow-md'>
					<Sparkles className='w-5 h-5 animate-pulse' />
				</div>
				<motion.div
					className='text-sm leading-relaxed'
					animate={{ opacity: [0.6, 1, 0.6] }}
					transition={{ duration: 2, repeat: Infinity }}
				>
					👋 Привет! Я — UnrealBot. <br />
					Хочешь, я помогу тебе начать?
				</motion.div>
			</div>

			<motion.button
				onClick={() => speak('Готово. Перенаправляю вас в магазин будущего.')}
				className='mt-4 w-full bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md text-sm transition-all'
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				🎙️ Слушаю тебя
			</motion.button>
		</motion.div>
	)
}
