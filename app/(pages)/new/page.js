'use client'

import { useGetDataByCategory } from '@/app/api/api-hooks'
import { CardsListSection } from '../../components/CardList/CardsListSection'
import { endpoints } from '@/app/api/config'
import { Preloader } from '@/app/components/Preloader/Proloader'

export default function New() {
	const newGames = useGetDataByCategory(endpoints.games, 'new')
	return (
		<main className='main'>
			{newGames ? (
				<CardsListSection
					data={newGames}
					cardId={'new'}
					cardTilte={'Новинки'}
				/>
			) : (
				<Preloader />
			)}
		</main>
	)
}
