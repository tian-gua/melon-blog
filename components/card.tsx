'use client'

import React from "react";
import BrowserUtils from "@/server/utils/browser-utils";

const Card = ({children}: any) => {
    const [userAgent, setUserAgent] = React.useState<string>('')
    React.useEffect(() => {
        setUserAgent(navigator.userAgent)
    }, []);

    // if (!userAgent) {
    //     return <></>
    // }

    return (
        <div className={`w-full mt-5 text-[1em] bg-white border border-gray-200 ${BrowserUtils.isMobile(userAgent) ? 'py-4 px-1' : 'p-4'}`}>
            {children}
        </div>
    )
}

export default Card
