import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
	const location = useLocation()

	const navItem = (to, label) => {
		const isActive = location.pathname === to
		return (
			<Link
				to={to}
				className={`relative px-1 py-0.5 font-medium transition-all duration-300 ${
					isActive
						? 'text-purple-500'
						: 'text-black dark:text-white hover:text-purple-400'
				}`}
			>
				<span className='relative z-10'>{label}</span>
				{isActive && (
					<span className='absolute bottom-0 left-0 w-full h-[2px] bg-purple-500 rounded-full transition-all duration-300' />
				)}
			</Link>
		)
	}

	return (
		<nav className='w-full bg-white/80 dark:bg-black/30 backdrop-blur-lg fixed top-0 left-0 z-50 shadow-sm border-b border-purple-300/10 transition-colors'>
			<div className='max-w-6xl mx-auto px-6 py-4 flex justify-between items-center'>
				<Link
					to='/'
					className='text-xl font-extrabold tracking-widest text-black dark:text-white hover:text-purple-500 transition'
				>
					UNREALMART
				</Link>
				<div className='flex gap-6 text-sm md:text-base items-center'>
					{navItem('/', 'Главная')}
					{navItem('/shop', 'Магазин')}
					{navItem('/ai-lab', 'AI-Лаборатория')}
					{navItem('/about', 'О нас')}
					{navItem('/team', 'Команда')}
					{navItem('/settings', '⚙️')}
				</div>
			</div>
		</nav>
	)
}
