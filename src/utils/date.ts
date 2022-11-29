import dayjs from 'dayjs'

export const formatDate = (date: Date) => {
    return dayjs(date).format('ddd, MMM D, YYYY h:mm A')
}

interface ConvertToHoursResult {
    type: 'h' | 'm'
    value: number
}

export const convertToHours = (val: number, movedToDevelopment: Date | undefined): ConvertToHoursResult => {
    if (movedToDevelopment) {
        console.log(movedToDevelopment)
        val = val + new Date().getTime() - new Date(movedToDevelopment).getTime()
    }

    val = val / 1000 / 60
    val = Math.floor(val)
    if (val < 60) {
        return {
            type: 'm',
            value: val
        }
    } else {
        val = val / 60
        return {
            type: 'm',
            value: Math.floor(val)
        }
    }
}