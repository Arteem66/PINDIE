'use client'

import { useGetDataByCategory } from '@/app/api/api-hooks'
import { endpoints } from '@/app/api/config'
import { CardsListSection } from '../../components/CardList/CardsListSection'
import { Preloader } from '@/app/components/Preloader/Proloader'

export default function New() {
	const pixelGames = useGetDataByCategory(endpoints.games, 'pixel')
	return (
		<main className='main'>
			{pixelGames ? (
				<CardsListSection
					data={pixelGames}
					cardId={'pixel-game'}
					cardTilte={'Пиксельные игры'}
				/>
			) : (
				<Preloader />
			)}
		</main>
	)
}
