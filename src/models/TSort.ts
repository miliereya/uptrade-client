export type TColumnSort = 'a-z' | 'z-a' | 'priority-asc' | 'priority-desc'


export type TFilter = 'title' | 'num'

export type TColumnFilter = 'title' | 'priority'
export const columnFilterProps: TColumnFilter[] = ['title', 'priority']


export type TOrder = 'asc' | 'desc'
export const orderProps: TOrder[] = ['asc', 'desc']
