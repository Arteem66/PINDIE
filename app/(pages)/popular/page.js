'use client'

import { useGetDataByCategory } from '@/app/api/api-hooks'
import { endpoints } from '@/app/api/config'
import { CardsListSection } from '../../components/CardList/CardsListSection'
import { Preloader } from '@/app/components/Preloader/Proloader'

export default function New() {
	const popularGames = useGetDataByCategory(endpoints.games, 'popular')
	return (
		<main className='main'>
			{popularGames ? (
				<CardsListSection
					data={popularGames}
					cardId={'popular'}
					cardTilte={'Популярные'}
				/>
			) : (
				<Preloader />
			)}
		</main>
	)
}
