'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useStore } from '@/app/store/app-store'
import { endpoints } from '@/app/api/config'
import { isResponseOk, authorize,} from '@/app/api/api-utils'

import Styles from './AuthForm.module.css'

export const AuthForm = (props) => {
	const authContext = useStore()
	const [authData, setAuthData] = useState({ identifier: '', password: '' })
	const [message, setMessage] = useState({ status: null, text: null })

	const handleInput = e => {
		setAuthData({ ...authData, [e.target.name]: e.target.value })
	}

	const handleMessage = () => {
		setMessage({ status: null, text: null })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		/* Вызываем функцию authorize с данными из формы */
		const userData = await authorize(endpoints.auth, authData)
		/* Проверяем ответ сервера с помощью isResponseOk */
		if (isResponseOk(userData)) {
			if (userData){
				authContext.login(userData.user, userData.jwt)
				setMessage({ status: 'success', text: 'Вы авторизовались!' })
			}else{
				setMessage({ status: 'success', text: 'Вы зарегистрированы?' })
			}
		} else {
			/* Записываем сообщение об ошибке */
			setMessage({ status: 'error', text: 'Неверные почта или пароль' })
		}
	}

	useEffect(() => {
		let timer
		if (authContext.user) {
			timer = setTimeout(() => {
				setMessage({ status: null, text: null })
				props.isClose()
			}, 1000)
		}
	}, [authContext.user])

	

	return (
		<form className={Styles['form']} onSubmit={handleSubmit}>
			<h2 className={Styles['form__title']}>Авторизация</h2>
			<div className={Styles['form__fields']}>
				<label className={Styles['form__field']}>
					<span className={Styles['form__field-title']}>Email</span>
					<input
						onInput={handleInput}
						className={Styles['form__field-input']}
						name='identifier'
						type='email'
						placeholder='hello@world.com'
					/>
				</label>
				<label className={Styles['form__field']}>
					<span className={Styles['form__field-title']}>Пароль</span>
					<input
						onInput={handleInput}
						className={Styles['form__field-input']}
						name='password'
						type='password'
						placeholder='***********'
					/>
				</label>
			</div>
			<p className={Styles['register-text']}>
				Зарегистрироваться можно
				<Link
					href={'/register'}
					onClick={(props.isClose, handleMessage)}
					className={Styles['register-link']}
				>
					тут
				</Link>
			</p>
			{message.status && (
				<p className={Styles['form__message']}>{message.text}</p>
			)}
			<div className={Styles['form__actions']}>
				<button className={Styles['form__reset']} type='reset'>
					Очистить
				</button>
				<button className={Styles['form__submit']} type='submit'>
					Войти
				</button>
			</div>
		</form>
	)
}
