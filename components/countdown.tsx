"use client"
import React, { useEffect, useState } from 'react'
import { DateTime } from '#/lib/datetime';
/* const display = "summarized" */
const display = "analog"
const display3 = "descriptive"


const Countdown = () => {
    const [timeRemaining, setTimeRemaining] = useState<null | string>(null)
    useEffect(() => {
        let t = new DateTime('1-1-2024 5:00:00 pm')
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
