import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ru } from '../../languages/ru'
import { en } from '../../languages/en'
import { GlobalActionTypes } from '../../models/actions/GLobalActionModel'
import s from './Header.module.css'
import logoutIcon from '../../images/icons/logout.png'
import { userService } from '../../services/userService'
import { NavLink } from 'react-router-dom'

export const Header = () => {
    const { language } = useTypedSelector(state => state.global)
    const { user } = useTypedSelector(state => state.user)

    const dispatch = useDispatch()

    const languageHandler = () => {
        if (language.mark === 'en') {
            dispatch({ type: GlobalActionTypes.SET_LANGUAGE, payload: ru })
            localStorage.setItem('language', 'ru')
        } else {
            dispatch({ type: GlobalActionTypes.SET_LANGUAGE, payload: en })
            localStorage.setItem('language', 'en')
        }
    }

    const logoutHandler = () => {
        userService.logout(dispatch)
    }

    return (
        <div className={s.section}>
            <div className="container">
                <div className={s.wrapper}>
                    <NavLink to='/' className={s.heading}>To-Do-List</NavLink>
                    {user ?
                        <div className={s.info_wrapper}>
                            <p className={s.email}>{user.email}</p>
                            <button
                                className={s.logout}
                                onClick={logoutHandler}
                            >
                                <img
                                    src={logoutIcon}
                                    alt={language.header.logout}
                                    className={s.logout_icon}
                                />
                            </button>
                            <button
                                className={s.language_button}
                                onClick={languageHandler}
                            >
                                {language.mark === 'ru' ? 'en' : 'ru'}
                            </button>
                        </div>
                        :
                        <div className={s.info_wrapper}>
                            <button
                                className={s.sign_button}
                                onClick={() => dispatch({ type: GlobalActionTypes.SET_AUTH_POPUP_OPENED })}
                            >
                                {language.header.sign}
                            </button>
                            <button
                                className={s.language_button}
                                onClick={languageHandler}
                            >
                                {language.mark === 'ru' ? 'en' : 'ru'}
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}