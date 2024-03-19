'use client'

import { useGetDataByCategory } from '@/app/api/api-hooks'
import { endpoints } from '@/app/api/config'
import { CardsListSection } from '../../components/CardList/CardsListSection'
import { Preloader } from '@/app/components/Preloader/Proloader'

export default function New() {
	const tdsGames = useGetDataByCategory(endpoints.games, 'TDS')
	return (
		<main className='main'>
			{tdsGames ? (
				<CardsListSection data={tdsGames} cardId={'tds'} cardTilte={'TDS'} />
			) : (
				<Preloader />
			)}
		</main>
	)
}
