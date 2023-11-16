"use client"
import React, { useEffect, useState } from 'react'
import { DateTime, TimeDiff } from '#/lib/datetime';
const display = "diff"


const CountdownItem = ({ label, value }: { label: string, value?: number }) => {
    if (typeof value !== "number") return null
    return (
        <div className={"grid grid-cols-1 grid-rows-[1fr_auto] gap-2"}>
            <div className={"font-extrabold text-xl sm:text-3xl place-self-center py-1 sm:py-3"}>{value}</div>
            <div className={"font-light text-sm sm:text-base w-full text-center bg-primary text-primary-foreground px-2 rounded-sm"}>{label}</div>
        </div>
    )
}

const Countdown = () => {
    const [timeRemaining, setTimeRemaining] = useState<null | TimeDiff>(null)
    useEffect(() => {
        let t = new DateTime('1-1-2024 5:00:00 pm')
        t.flat = true
        setTimeRemaining(t.relativeTime(display) as TimeDiff)
        let interval = t.updateOnInterval(1, "diff", (s) => setTimeRemaining(s as TimeDiff))
        return () => clearInterval(interval)
    }, [])
    return (
        <div
            className={"grid grid-cols-[1fr_1fr_1fr_1fr_1fr] md:sm:grid-cols-[96px_96px_96px_96px_96px] gap-2 border p-2 rounded-md"}
            style={{
                /* background-color: "rgb(2,0,36)", */
                background: "linear-gradient(0deg, rgba(0,36,0,1) 0%, rgba(41,66,41,1) 52%, rgba(33,197,94,1) 100%)"
            }}
        >
            <CountdownItem label={timeRemaining?.months === 1 ? "Month" : "Months"} value={timeRemaining?.months} />
            <CountdownItem label={timeRemaining?.days === 1 ? "Day" : "Days"} value={timeRemaining?.days} />
            <CountdownItem label={timeRemaining?.hours === 1 ? "Hour" : "Hours"} value={timeRemaining?.hours} />
            <CountdownItem label={timeRemaining?.minutes === 1 ? "Minute" : "Minutes"} value={timeRemaining?.minutes} />
            <CountdownItem label={timeRemaining?.seconds === 1 ? "Second" : "Seconds"} value={timeRemaining?.seconds} />
        </div>
    )
}


Countdown.displayName = "Countdown"


export default Countdown;
