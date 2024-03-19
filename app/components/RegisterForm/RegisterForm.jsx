'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { endpoints } from '@/app/api/config'
import { authorize, isResponseOk } from '@/app/api/api-utils'

import Styles from '../AuthForm/AuthForm.module.css'

export const RegisterForm = () => {

  const router = useRouter()
  const [message, setMessage] = useState({ status: null, text: null })
  const [registerData, setRegisterData] = useState({
		username: '',
		identifier: '',
		password: '',
	})

	const handleInput = e => {
		setRegisterData({ ...registerData, [e.target.name]: e.target.value })
	}

	const postInfo = async e => {
		e.preventDefault()

    const userData = await authorize(endpoints.register, registerData)
    if (isResponseOk(userData)) {
      setRegisterData({ username: '', identifier: '', password: '' })
			setMessage({ status: 'success', text: 'Вы Зарегистрировались!' })
		} else {
			/* Записываем сообщение об ошибке */
			setMessage({ status: 'error', text: 'Неверные почта или пароль' })
		}
	}

	return (
		<form onSubmit={postInfo} action=''>
			<label className={Styles['form__field']}>
				<span className={Styles['form__field-title']}>Имя пользователя</span>
				<input
					className={Styles['form__field-input']}
					type='text'
					name='username'
					placeholder='Игорь'
					onInput={handleInput}
				/>
			</label>
			<label className={Styles['form__field']}>
				<span className={Styles['form__field-title']}>Email</span>
				<input
					className={Styles['form__field-input']}
					type='email'
					name='email'
					placeholder='hello@world.com'
					onInput={handleInput}
				/>
			</label>
			<label className={Styles['form__field']}>
				<span className={Styles['form__field-title']}>Пароль</span>
				<input
					className={Styles['form__field-input']}
					type='password'
					name='password'
					placeholder='***********'
					onInput={handleInput}
				/>
			</label>
			{message.status && (
				<p className={Styles['form__message']}>{message.text}</p>
			)}
			<div className={Styles['form__actions']}>
				<button className={Styles['form__reset']} type='reset'>
					Очистить
				</button>
				<button className={Styles['form__submit']} type='submit'>
					Зарегистрироваться
				</button>
			</div>
		</form>
	)
}
