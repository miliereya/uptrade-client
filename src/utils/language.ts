import { TStatus } from "../models/IStatus"
import { TColumnFilter, TFilter, TOrder } from "../models/TSort"

export const translateStatusVal = (status: TStatus, langMark: string): string => {
    if (langMark === 'ru') {
        if (status === 'queue') {
            return 'не активно'
        } else if (status === 'development') {
            return 'в процессе'
        } else {
            return 'завершено'
        }
    } else {
        return status
    }
}

export const translateStatusValShort = (status: string, langMark: string): string => {
    if (langMark === 'ru') {
        if (status === 'queue') {
            return 'очер.'
        } else if (status === 'development') {
            return 'проц.'
        } else {
            return 'зав.'
        }
    } else {
        if (status === 'development') {
            return 'dev.'
        } else {
            return status
        }
    }
}

export const translateSortByVal = (filter: TColumnFilter, langMark: string) => {
    if (langMark === 'ru') {
        if (filter === 'priority') {
            return 'приор.'
        } else {
            return 'назв.'
        }
    } else {
        return filter
    }
}

export const translateOrderVal = (order: TOrder, langMark: string) => {
    if (langMark === 'ru') {
        if (order === 'asc') {
            return 'убыв.'
        } else {
            return 'возр.'
        }
    } else {
        return order
    }
}

export const translateSearchVal = (val: TFilter, langMark: string) => {
    if (langMark === 'ru') {
        if (val === 'num') {
            return 'ном.'
        } else {
            return 'назв.'
        }
    } else {
        return val
    }
}