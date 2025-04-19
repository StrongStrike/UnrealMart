import { useEffect, useRef } from 'react'

export default function ParallaxStars() {
	const starsRef = useRef(null)

	useEffect(() => {
		const handler = e => {
			if (!starsRef.current) return
			const x = (e.clientX / window.innerWidth - 0.5) * 15
			const y = (e.clientY / window.innerHeight - 0.5) * 15
			starsRef.current.style.transform = `translate(${x}px, ${y}px)`
		}

		window.addEventListener('mousemove', handler)
		return () => window.removeEventListener('mousemove', handler)
	}, [])

	return (
		<div
			ref={starsRef}
			className={`
        absolute inset-0 z-0 pointer-events-none transition-transform duration-100
        bg-[radial-gradient(#6B21A860_1px,transparent_1px)]
        dark:bg-[radial-gradient(#ffffff50_1px,transparent_1px)]
        [background-size:18px_18px]
        opacity-40 dark:opacity-20
      `}
		/>
	)
}
