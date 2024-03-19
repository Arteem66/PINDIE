'use client'
import { AuthForm } from "@/app/components/AuthForm/AuthForm";
import Styles from './authorization.module.css'

const Authorization = () => {
  return (
    <main className={Styles["main"]}>
      <div className={Styles["container"]}>
        <AuthForm /> 
      </div>
    </main>
  );
}
 
export default Authorization;