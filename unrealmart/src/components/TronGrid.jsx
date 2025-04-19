import { useSettings } from '../context/SettingsContext'

export default function TronGrid() {
	const { settings } = useSettings()
	const isLight = settings.theme === 'light'

	return (
		<div className='absolute bottom-0 left-0 w-full h-64 z-0 overflow-hidden pointer-events-none blur-sm'>
			<div
				className={`
          w-[200%] h-full 
          ${isLight ? 'opacity-10' : 'opacity-20'}
          bg-gradient-to-t 
          ${isLight ? 'from-purple-400/20' : 'from-purple-700/20'} 
          via-transparent to-transparent
          [background-image:repeating-linear-gradient(#9333ea44_0_2px,transparent_2px_40px)]
          animate-[gridmove_10s_linear_infinite]
        `}
			/>
			<style>{`
        @keyframes gridmove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
      `}</style>
		</div>
	)
}
