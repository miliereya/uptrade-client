import { FC } from 'react'
import s from './AddProjectButton.module.css'

interface AddProjectButtonProps {
    onClick: any
    disabled: boolean
}

export const AddProjectButton: FC<AddProjectButtonProps> = ({onClick, disabled}) => {
    return (
        <button
            className={s.section}
            onClick={onClick}
            disabled={disabled}
        >
            +
        </button>
    )
}