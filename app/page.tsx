"use client"
import Countdown from '#/components/countdown'
import FacebookSocialIcon from '#/components/facebook'
import HeroAnimatedTitle from '#/components/heroanimatedtitle'
import IconButton from '#/components/iconButton'
import InstagramSocialIcon from '#/components/instagram'
import TwitterXSocialIcon from '#/components/twitterX'
import { appConfig } from '#/lib/appConfig'
import ReactGA from "react-ga4";
ReactGA.initialize("G-J60C68V8CQ");



export default function Home() {
    ReactGA.send({ hitType: "pageview", page: "/comingSoon", title: "Coming Soon view" });
    return (
        <div className={"w-full h-screen flex flex-col justify-center items-center gap-3 group/heroContainer relative"} id={"hero-container"}>
            <div className={"flex flex-col justify-center items-center w-fit h-full gap-4 max-w-[calc(100vw-32px)]"}>
                <Countdown />
                <div className={"grid grid-cols-[1fr_auto_1fr] w-full place-items-center gap-2"}>
                    <div className={"h-[2px] bg-gray-300 bg-opacity-70 w-full origin-right scale-x-0 hero-label-line transition-[opacity,transform] duration-300 delay-1000 group-[.isLoaded]/heroContainer:scale-x-100"} />
                    <p className={"text-md text-[4vw] lg:text-2xl text-foreground opacity-0 transition-[opacity,transform] duration-300 translate-y-8 group-[.isLoaded]/heroContainer:translate-y-0  group-[.isLoaded]/heroContainer:opacity-100 delay-700"}>{appConfig.landing.subtitle}</p>
                    <div className={"h-[2px] bg-gray-300 bg-opacity-70 w-full origin-left scale-x-0 hero-label-line transition-[opacity,transform] duration-300 group-[.isLoaded]/heroContainer:scale-x-100 delay-1000"} />
                </div>
                <HeroAnimatedTitle />
                <p className={"max-w-[768px] text-center font-thin text-white text-[4vw] md:text-xl opacity-0 group-[.isLoaded]/heroContainer:opacity-100 transition-opacity duration-300 delay-1200"}>{appConfig.landing.slogan}</p>
                <h2 className={"text-3xl font-extrabold text-primary"}>Coming Soon</h2>
                <div className={"w-fit flex flex-row text-foreground justify-center items-center gap-4 opacity-0 -translate-y-8 group-[.isLoaded]/heroContainer:translate-y-0 group-[.isLoaded]/heroContainer:opacity-100 transition-all duration-300 delay-1300"}>
                    <IconButton facebook>
                        <FacebookSocialIcon className={"rounded-md w-8 h-8 transition-colors duration-300"} />
                    </IconButton>
                    <IconButton instagram>
                        <InstagramSocialIcon className={"rounded-md w-8 h-8 transition-colors duration-300"} />
                    </IconButton>
                    <IconButton twitter>
                        <TwitterXSocialIcon className={"rounded-md w-8 h-8 transition-colors duration-300"} />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}
