'use client'

import { useGetDataByCategory } from '@/app/api/api-hooks'
import { endpoints } from '@/app/api/config'
import { CardsListSection } from '../../components/CardList/CardsListSection'
import { Preloader } from '@/app/components/Preloader/Proloader'

export default function New() {
	const shooterGames = useGetDataByCategory(endpoints.games, 'shooter')
	return (
		<main className='main'>
			{shooterGames ? (
				<CardsListSection
					data={shooterGames}
					cardId={'shooter'}
					cardTilte={'Шутер'}
				/>
			) : (
				<Preloader />
			)}
		</main>
	)
}
