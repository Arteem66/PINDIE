import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Styles from './NavList.module.css'

const NavList = props => {
	const pathname = usePathname()
	return (
		<li className={Styles['menu__item']}>
			<Link href={props.link} className={`${Styles['menu__link']} ${pathname === props.link ? Styles['menu__link_active'] : ''}`}>
				{props.linkName}
			</Link>
		</li>
	)
}

export default NavList
