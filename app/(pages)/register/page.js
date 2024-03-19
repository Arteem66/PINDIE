import { RegisterForm } from '@/app/components/RegisterForm/RegisterForm'
import Styles from './register.module.css'

export default function Register (){
  return(
    <main className={Styles['main']}>
      <section className={Styles['register']}>
        <h2>Регистрация</h2>
        <RegisterForm />
      </section>
    </main>
  )
}