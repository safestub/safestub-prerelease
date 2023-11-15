import dayjs, { Dayjs } from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)


// BUG: Come back here and figure out when a time is over a month the hours appears ten hours short... from 17:xx to 7:xx. Works appropriately up until 1 month
dayjs.tz.setDefault("America/Chicago")

interface TimeConfig {
    seconds?: number
    minutes?: number
    hours?: number
    days?: number
    months?: {
        "28"?: number
        "29"?: number
        "30"?: number
        "31"?: number
    }
    years?: {
        '365'?: number
        '365.24'?: number
        '366'?: number
    }
}

const secondsMap = {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    months: {
        "28": 86400 * 28,
        "29": 86400 * 29,
        "30": 86400 * 30,
        "31": 86400 * 31,
    },
    years: {
        '365': 86400 * 365,
        '365.24': 86400 * 365.24,
        '366': 86400 * 366,
    }
}

export type TimeDisplayType = "analog" | "summarized" | "descriptive"

export class DateTime {
    t: Date
    dayjs: Dayjs
    withoutSuffix: boolean = false
    timezone: string
    flat: boolean = false
    constructor(t: Date | string | Dayjs) {
        this.timezone = this.getTimezone()
        this.dayjs = dayjs.isDayjs(t) ? t : t instanceof Date ? dayjs(t) : dayjs(t, 'M-DD-YYYY H:mm:ss a').tz(this.timezone)
        this.t = this.dayjs.toDate()
    }

    private getTimezone() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Chicago"
    }

    djs(t: Date | string | Dayjs) {
        return dayjs.tz(t, this.timezone)
    }

    updateOnInterval(intervalSeconds: number, type: TimeDisplayType, callback: (s: string) => void) {
        let interval = setInterval(() => {
            callback(this.relativeTime(type))
        }, intervalSeconds * 1000)
        return interval
    }

    formatDate(withTime?: boolean) {
        const formatStr = withTime ? "MMM Do YYYY [at] h:mm a" : "MMM Do YYYY"
        return this.dayjs.local().format(formatStr)
    }

    now(asValue: boolean = false) {
        return asValue ? new Date().valueOf() : new Date()
    }

    secondDifference(fromTo: Date = new Date()) {
        return this.dayjs.local().diff(fromTo, "seconds")
    }

    diffAsDuration(t: Date = new Date()) {
        return dayjs.duration(this.secondDifference(t), "seconds")
    }

    seconds(t: TimeConfig) {
        let s = 0
        for (const k in t) {
            if (typeof t[k as keyof typeof t] === "object") {
                /// @ts-ignore
                for (const l in t[k]) {
                    /// @ts-ignore
                    if (typeof t[k][l] === "number") {
                        /// @ts-ignore
                        s += t[k][l] * s[k][l]
                    }
                }
            } else {
                /// @ts-ignore
                if (typeof t[k] === "number") {
                    /// @ts-ignore
                    s += t[k] * s[k]
                }
            }
        }
        return s
    }

    getFlattenedDiff(t: Date = new Date()) {
        let s = (this.t.valueOf() - t.valueOf()) / 1000
        let months = Math.floor(s / secondsMap.months[30])
        s = s - months * secondsMap.months[30]
        let days = Math.floor(s / secondsMap.days)
        s = s - days * secondsMap.days
        let hours = Math.floor(s / secondsMap.hours)
        s = s - hours * secondsMap.hours
        let minutes = Math.floor(s / secondsMap.minutes)
        s = s - minutes * secondsMap.minutes
        let seconds = Math.floor(s)
        let res = {
            months,
            days,
            hours,
            minutes,
            seconds
        }
        return res
    }

    formatTimeDiff(duration?: duration.Duration, t: Date = new Date()) {
        let dur = duration || this.diffAsDuration(t)
        return {
            years: dur.years(),
            days: dur.days(),
            asDays: dur.asDays(),
            months: dur.months(),
            hours: dur.hours(),
            minutes: dur.minutes(),
            seconds: dur.seconds()
        }
    }

    private getDiffBaseString(duration: duration.Duration) {
        let days = duration.days()
        let months = duration.months()
        let s = ''
        if (this.flat) {
            let asDays = Math.floor(duration.asDays())
            if (asDays > 0) s += `[${asDays} ${asDays === 1 ? "day" : "days"} ]`
        } else {
            if (months > 0) s += months === 1 ? 'M [month] ' : 'M [months] '
            if (days > 0) s += days === 1 ? 'D [day] ' : 'D [days] '
        }
        return s
    }

    private relativeTimeAnalog() {
        let flat = this.getFlattenedDiff()
        let s = ''
        if (flat.months > 0) {
            s += `${flat.months} ${flat.months === 1 ? 'month' : 'months'} `
        }
        if (flat.days > 0) {
            s += `${flat.days} ${flat.days === 1 ? 'day' : 'days'} `
        }
        s += `${flat.hours || 0}:${flat.minutes < 10 ? `0${flat.minutes}` : flat.minutes}:${flat.seconds < 10 ? `0${flat.seconds}` : flat.seconds}`
        return s
    }

    private relativeTimeDescriptive() {
        let duration = this.diffAsDuration()
        let s = this.getDiffBaseString(duration)
        let dt = this.formatTimeDiff(duration)
        if (dt.hours) s += dt.hours === 1 ? 'H [hour] ' : 'H [hours] '
        if (dt.minutes) s += dt.minutes === 1 ? 'm [minute] ' : 'm [minutes] '
        if (dt.seconds) s += dt.seconds === 1 ? 'ss [second] ' : 'ss [seconds] '
        return duration.format(s.trim())
    }

    private relativeTimeSummarized() {
        return this.dayjs.local().fromNow(this.withoutSuffix)
    }

    relativeTime(type: "descriptive" | "analog" | "summarized") {
        if (type === "analog") return this.relativeTimeAnalog()
        if (type === "summarized") return this.relativeTimeSummarized()
        if (type === "descriptive") return this.relativeTimeDescriptive()
        return ""
    }


}
