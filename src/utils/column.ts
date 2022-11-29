export const defineOtherCols = (title: string, langMark: string): (string | null)[] => {
    if (title === 'queue') {
        return [null, 'development']
    } else if (title === 'development') {
        return ['queue', 'done']
    } else {
        return ['development', null]
    }
}
