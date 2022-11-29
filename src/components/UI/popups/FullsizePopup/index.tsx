import s from './FullsizePopup.module.css'
import { FC, ReactNode } from 'react'

interface FullsizePopupProps {
    children: ReactNode
    setPopupToogle: any
}

export const FullsizePopup: FC<FullsizePopupProps> = ({children, setPopupToogle}) => {

    return (
        <div className={s.section}>
            <div className={s.wrapper} onClick={() => setPopupToogle()}></div>
            {children}
        </div>
    )
}