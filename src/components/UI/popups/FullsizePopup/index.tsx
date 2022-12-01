import s from './FullsizePopup.module.css'
import { FC, ReactNode } from 'react'

interface FullsizePopupProps {
    children: ReactNode
    setPopupToogle: any
    zIndex?: string
}

export const FullsizePopup: FC<FullsizePopupProps> = ({children, setPopupToogle, zIndex = '9920'}) => {

    return (
        <div className={s.section} style={{zIndex: zIndex}}>
            <div className={s.wrapper} onClick={() => setPopupToogle()}></div>
            {children}
        </div>
    )
}