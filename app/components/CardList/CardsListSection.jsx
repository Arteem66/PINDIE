import { CardsList } from './CardList'
import { CardsSlider } from './CardsSlider'
import Styles from './CardList.module.css'

export const CardsListSection = props => {
	return (
		<section className={Styles['list-section']}>
			<h2 className={Styles['list-section__title']} id={props.cardId}>
				{props.cardTilte}
			</h2>
			{props.type === 'slider' ? (
				<CardsSlider data={props.data} />
			) : (
				<CardsList data={props.data} />
			)}
		</section>
	)
}
