'use client'

import { useGetDataByCategory } from '@/app/api/api-hooks'
import { endpoints } from '@/app/api/config'
import { CardsListSection } from '../../components/CardList/CardsListSection'
import { Preloader } from '@/app/components/Preloader/Proloader'

export default function New() {
	const runnerGames = useGetDataByCategory(endpoints.games, 'runner')
	return (
		<main className='main'>
			{runnerGames ? (
				<CardsListSection
					data={runnerGames}
					cardId={'runner'}
					cardTilte={'Раннеры'}
				/>
			) : (
				<Preloader />
			)}
		</main>
	)
}
