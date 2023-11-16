import { appConfig } from '#/lib/appConfig';
import React from 'react'
import ReactGA from "react-ga4";
import { Button } from './ui/button';
ReactGA.initialize("G-J60C68V8CQ");

const IconButton = ({ children, className, facebook, instagram, twitter }: { children: React.ReactNode, className?: string, twitter?: boolean, instagram?: boolean, facebook?: boolean }) => {
    const t = facebook ? 'facebook' : twitter ? 'twitter' : instagram ? 'instagram' : null
    if (!t) return
    return (
        <a
            href={appConfig[t].url}
            onClick={() => {
                ReactGA.event({
                    category: "socialClick",
                    action: `${t}SocialClick`,
                    label: `${t}SocialClick`,
                    nonInteraction: false,
                    transport: "xhr",
                });
            }}
        >
            <Button variant="outline" size="icon" className={"group/iconBtn"}>
                {children}
            </Button>
        </a>
    )
}


IconButton.displayName = "IconButton"


export default IconButton;
