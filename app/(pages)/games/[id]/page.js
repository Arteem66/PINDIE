'use client'
import { useEffect, useState } from 'react'
import { useStore } from '@/app/store/app-store'
import {
	getNormalizedGameDataById,
	vote,
	checkIfUserVoted,
} from '@/app/api/api-utils'
import { endpoints } from '@/app/api/config'
import { GameNotFound } from '../../gamesNotFound/GameNotFound'
import { Preloader } from '@/app/components/Preloader/Proloader'
import { isResponseOk } from '@/app/api/api-utils'

import Styles from './Game.module.css'

export default function GamePage(props) {
	const authContext = useStore()

	const [game, setGame] = useState(null)
	const [preloaderVisible, setPreloaderVisible] = useState(true)
	const [isVoted, setIsVoted] = useState(false)

	useEffect(() => {
		async function fetchData() {
			setPreloaderVisible(true)
			const game = await getNormalizedGameDataById(
				endpoints.games,
				props.params.id
			)
			isResponseOk(game) ? setGame(game) : setGame(null)
			setPreloaderVisible(false)
		}
		fetchData()
	}, [])

	useEffect(() => {
		// Данные о пользователе получаем из контекста authContext.user
		authContext.user && game
			? setIsVoted(checkIfUserVoted(game, authContext.user.id))
			: setIsVoted(false)
	}, [authContext.user, game])

	const handleVote = async () => {
		const jwt = authContext.token // Данные о токене получаем из контекста
		let usersIdArray = game.users.length ? game.users.map(user => user.id) : []
		usersIdArray.push(authContext.user.id) // Данные о пользователе получаем из контекста
		const response = await vote(
			`${endpoints.games}/${game.id}`,
			jwt,
			usersIdArray
		)
		if (isResponseOk(response)) {
			setGame(() => {
				return {
					...game,
					// Данные о пользователе получаем из контекста
					users: [...game.users, authContext.user],
					users_permissions_users: [
						...game.users_permissions_users,
						authContext.user,
					],
				}
			})
			setIsVoted(true)
		}
	}
	return (
		<main className='mane'>
			{game ? (
				<>
					<section className={Styles['game']}>
						<iframe className={Styles['game__iframe']} src={game.link}></iframe>
					</section>
					<section className={Styles['about']}>
						<h2 className={Styles['about__title']}>{game.title}</h2>
						<div className={Styles['about__content']}>
							<p className={Styles['about__description']}>{game.description}</p>
							<div className={Styles['about__author']}>
								<p>
									Автор:
									<span className={Styles['about__accent']}>
										{game.developer}
									</span>
								</p>
							</div>
						</div>
						<div className={Styles['about__vote']}>
							<p className={Styles['about__vote-amount']}>
								За игру уже проголосовали:
								<span className={Styles['about__accent']}>
									{game.users.length}
								</span>
							</p>
							<button
								className={`button ${Styles['about__vote-button']}`}
								disabled={!authContext.isAuth || isVoted}
								onClick={handleVote}
							>
								{isVoted ? 'Голос учтён' : 'Голосовать'}
							</button>
						</div>
					</section>
				</>
			) : preloaderVisible ? (
				<Preloader />
			) : (
				<section className={Styles['game']}>
					<GameNotFound />
				</section>
			)}
		</main>
	)
}
