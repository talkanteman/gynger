import { DateTime } from 'luxon'

export function getDate(date: string) {
    try {
        return DateTime.fromISO(date).toISODate()
    } catch {
        return null
    }
}