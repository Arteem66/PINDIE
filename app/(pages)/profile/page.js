'use client'

import { useEffect, useState } from 'react'
import { getJWT, getMe, isResponseOk } from '@/app/api/api-utils'
import { endpoints } from '@/app/api/config'

import Styles from './profile.module.css'

export default function Profile () {

  const [userInfo, setUserInfo] = useState({username: '', email: ''})

  useEffect(() => {
    async function getData() {
      const jwt = getJWT()
      const data = await getMe(endpoints.me, jwt)
      console.log(data)
      if (isResponseOk(data)){
        setUserInfo(data)
      }
    }
    getData()
  }, [])
  
  return (
		<main className='main'>
			<section className={Styles['profile']}>
				<h2 className={Styles['profile-title']}>Мой профиль</h2>
				<div className={Styles['profile-info']}>
					<ul className={Styles['profile-info-list']}>
						<li className={Styles['profile-info-item']}>
							<h3 className={Styles['profile-item-title']}>Имя</h3>
							<p className={Styles['profile-item-descr']}>{userInfo.username}</p>
						</li>
						<li className={Styles['profile-info-item']}>
							<h3 className={Styles['profile-item-title']}>email</h3>
							<p className={Styles['profile-item-descr']}>{userInfo.email}</p>
						</li>
					</ul>
				</div>
			</section>
		</main>
	)
}