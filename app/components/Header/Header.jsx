'use client'
import NavList from '../NavList/NavList'
import { useState } from 'react'
import { useStore } from '@/app/store/app-store'
import { Overlay } from '../Overlay/Overlay'
import { Popup } from '../Popup/Popup'
import { AuthForm } from '../AuthForm/AuthForm'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import Styles from './Header.module.css'

export const Header = () => {
	const authContext = useStore()
	const [popupIsOpened, setPopupIsOpened] = useState(false)

	const openPopup = () => {
		setPopupIsOpened(true)
	}
	const closePopup = () => {
		setPopupIsOpened(false)
	}

	const handleLogout = () => {
		authContext.logout()
	}

	const pathname = usePathname()

	return (
		<header className={Styles['header']}>
			{pathname === '/' ? (
				<div className={Styles['logo']}>
					<img
						className={Styles['logo__image']}
						src='../images/logo.svg'
						alt='Логотип Pindie'
					/>
				</div>
			) : (
				<Link href='/' className={Styles['logo']}>
					<img
						className={Styles['logo__image']}
						src='../images/logo.svg'
						alt='Логотип Pindie'
					/>
				</Link>
			)}

			<nav className={Styles['menu']}>
				<ul className={Styles['menu__list']}>
					<NavList linkName='Новинки' link={'/new'} />
					<NavList linkName='Популярные' link={'/popular'} />
					<NavList linkName='Шутеры' link={'/shooters'} />
					<NavList linkName='Ранеры' link={'/runners'} />
					<NavList linkName='Пиксельные' link={'/pixel-games'} />
					<NavList linkName='TDS' link={'/tds'} />
				</ul>
				<div className={Styles['auth']}>
					{authContext.isAuth ? (
						<button onClick={handleLogout} className={Styles['user']}>
							Выйти
						</button>
					) : (
						<button onClick={openPopup} className={Styles['auth__button']}>
							Войти
						</button>
					)}
					{authContext.isAuth && (
						<Link href={'/profile'} className={Styles['user']}>Профиль</Link>
					)}
				</div>
			</nav>
			<Overlay isOpen={popupIsOpened} isClose={closePopup} />
			<Popup isOpen={popupIsOpened} isClose={closePopup}>
				<AuthForm setAuth={authContext.isAuth} isClose={closePopup} />
			</Popup>
		</header>
	)
}
