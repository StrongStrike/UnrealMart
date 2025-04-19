import { useMemo } from 'react'
import { useSettings } from '../context/SettingsContext'

export default function GlowParticles() {
	const { settings } = useSettings()
	const isDark = settings.theme === 'dark'

	const particles = useMemo(() => {
		return Array.from({ length: 40 }).map((_, i) => {
			const size = 2 + Math.random() * 4
			const top = `${Math.random() * 100}%`
			const left = `${Math.random() * 100}%`
			const duration = `${3 + Math.random() * 5}s`
			const delay = `${Math.random() * 5}s`
			const scale = 0.8 + Math.random() * 1.5
			const direction = Math.random() > 0.5 ? 'float-up' : 'float-down'
			return { id: i, size, top, left, duration, delay, scale, direction }
		})
	}, [])

	return (
		<div className='absolute inset-0 z-0 pointer-events-none overflow-hidden'>
			{particles.map(p => (
				<div
					key={p.id}
					className={`absolute rounded-full blur-xl opacity-40 ${p.direction} ${
						isDark
							? 'bg-gradient-to-br from-purple-500 to-fuchsia-600'
							: 'bg-gradient-to-br from-pink-400 to-yellow-300'
					}`}
					style={{
						width: `${p.size}px`,
						height: `${p.size}px`,
						top: p.top,
						left: p.left,
						animationDelay: p.delay,
						animationDuration: p.duration,
						transform: `scale(${p.scale})`,
					}}
				/>
			))}

			<style>{`
        @keyframes float-up {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-20px); opacity: 0.8; }
        }

        @keyframes float-down {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(20px); opacity: 0.8; }
        }

        .float-up {
          animation: float-up infinite ease-in-out;
        }

        .float-down {
          animation: float-down infinite ease-in-out;
        }
      `}</style>
		</div>
	)
}
