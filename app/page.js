import { getNormalizedGamesDataByCategory } from './api/api-utils'

import { Banner } from './components/Banner/Banner'
import { CardsListSection } from './components/CardList/CardsListSection'
import { Promo } from './components/Promo/Promo'
import './page.module.css'
import { endpoints } from './api/config'

export default async function Home() {
	const popularGames = await getNormalizedGamesDataByCategory(
		endpoints.games,
		'popular'
	)
	const newGames = await getNormalizedGamesDataByCategory(
		endpoints.games,
		'new'
	)

	return (
		<main className='main'>
			<Banner />
			<CardsListSection
				data={popularGames}
				cardId={'popular'}
				cardTilte={'Популярное'}
				type={'slider'}
			/>
			<CardsListSection
				data={newGames}
				cardId={'new'}
				cardTilte={'Новинки'}
				type={'slider'}
			/>
			<Promo />
		</main>
	)
}
