"use client"
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { DateTime } from '#/lib/datetime';
dayjs.extend(customParseFormat)
dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)
dayjs.tz.setDefault("America/Chicago")

let launch = dayjs('1-1-2024 5:00:00 pm')
/* const display = "summarized" */
const display = "analog"
const display3 = "descriptive"


const Countdown = () => {
    const [timeRemaining, setTimeRemaining] = useState<null | string>(null)
    useEffect(() => {
        let t = new DateTime(launch)
        t.flat = true
        setTimeRemaining(t.relativeTime(display))
        let interval = t.updateOnInterval(1, display, (s: string) => setTimeRemaining(s))
        return () => clearInterval(interval)
    }, [])
    return (
        <div className={"absolute top-3 right-3"}>{timeRemaining || ""}</div>
    )
}


Countdown.displayName = "Countdown"


export default Countdown;
