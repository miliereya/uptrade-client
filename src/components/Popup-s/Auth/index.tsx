import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { GlobalActionTypes } from '../../../models/actions/GLobalActionModel'
import { FullsizePopup } from '../../UI/popups/FullsizePopup'
import s from './AuthPopup.module.css'
import { useState } from 'react'
import { UserActionTypes } from '../../../models/actions/UserActionModel'
import { userService } from '../../../services/userService'

export const AuthPopup = () => {
    const { language } = useTypedSelector(state => state.global)
    const { error } = useTypedSelector(state => state.user)
    const dispatch = useDispatch()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const isValidProps = (): boolean => {
        const email_regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
        if (!email_regex.test(email)) {
            dispatch({ type: UserActionTypes.SET_ERROR, payload: 'Invalid email' })
            return false
        }
        if (password.length < 4) {
            dispatch({ type: UserActionTypes.SET_ERROR, payload: 'Min password length - 4' })
            return false
        }
        return true
    }

    const loginHandler = () => {
        if (!isValidProps()) return
        const user = {
            email,
            password
        }
        userService.login(dispatch, user)
    }

    const registrHandler = () => {
        if (!isValidProps()) return
        const user = {
            email,
            password
        }
        userService.registr(dispatch, user)
    }

    return (
        <FullsizePopup setPopupToogle={() => dispatch({ type: GlobalActionTypes.SET_AUTH_POPUP_CLOSED })}>
            <div className={s.section}>
                <p className={s.heading}>{language.authPopup.auth}</p>
                <input
                    className={s.input}
                    type="text"
                    placeholder={language.authPopup.enter_email}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    className={s.input}
                    type="password"
                    maxLength={20}
                    placeholder={language.authPopup.enter_password}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button
                    className={s.button}
                    onClick={loginHandler}
                >
                    {language.authPopup.login}
                </button>
                <button
                    className={s.button}
                    onClick={registrHandler}
                >
                    {language.authPopup.sign_up}
                </button>
                {error && <p className={s.error}>{error}</p>}
            </div>
        </FullsizePopup>
    )
}