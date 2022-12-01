import { AddProjectButton } from '../../components/UI/buttons/AddProjectButton'
import s from './ChooseProjectPage.module.css'
import { useState } from 'react'
import { AddProjectPopup } from '../../components/Popup-s/AddProject'
import { ProjectItem } from '../../components/ProjectItem'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { GlobalActionTypes } from '../../models/actions/GLobalActionModel'

export const ChooseProjectPage = () => {
    const { language, isLoading } = useTypedSelector(state => state.global)
    const { user } = useTypedSelector(state => state.user)

    const dispatch = useDispatch()

    const [popupToogle, setPopupToogle] = useState<boolean>(false)
   

    //naw - no auth warning
    if (!user) {
        return (
            <>
                {!isLoading && <button
                    className={s.naw}
                    onClick={() => dispatch({ type: GlobalActionTypes.SET_AUTH_POPUP_OPENED })}
                >
                    {language.authPopup.sign_to_continue}
                </button>}
            </>
        )
    }
    return (
        <>
            {popupToogle &&
                <AddProjectPopup
                    setPopupToogle={setPopupToogle}
                />}

            <div className="container">
                <div className={s.section}>
                    <AddProjectButton
                        onClick={() => setPopupToogle(true)}
                        disabled={popupToogle}
                    />
                    {user.projects.map(project => {
                        return (
                            <ProjectItem
                                key={project._id}
                                project={project}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

