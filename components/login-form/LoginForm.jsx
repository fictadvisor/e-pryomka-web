import styles from './LoginForm.module.css';
import theme from '../../styles/theme.module.css';
import { useState } from "react";

export default function LoginForm({ authentication, onLogin }) {
  const [ login, setLogin ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  function tryLogin() {
    setLoading(true)
    authentication.login(login, password)
      .then(onLogin)
      .catch(setError)
      .finally(() => { setLoading(false) });
  }

  return (<div className={styles.login}>
    <div>
      <input type="text"
             placeholder="Логін"
             value={login}
             onInput={e => {
               setLogin(e.target.value)
               setError(null)
             }}
      />
      <input type="password"
             placeholder="Пароль"
             value={password}
             onInput={e => {
               setPassword(e.target.value)
               setError(null)
             }}
      />
      <button className={theme.buttonPrimary} onClick={tryLogin} disabled={loading}>Увійти</button>
      {
        error && <div className={theme.error}>Помилка авторизації.<br/>Спробуйте ще раз</div>
      }
    </div>
  </div>)
}
