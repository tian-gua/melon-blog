'use client'

import BrowserUtils from "@/server/utils/browser-utils";
import React from "react";

const Tags = () => {
    const [userAgent, setUserAgent] = React.useState<string>('')
    React.useEffect(() => {
        setUserAgent(navigator.userAgent)
    }, []);

    return <>
        <div className="ml-2 inline-block">
            {/*{BrowserUtils.isMobile(userAgent) ? <></> : <span className="box-border text-[11px] bg-pink-300 font-bold py-[2px] px-[3px] rounded">PC用户</span>}*/}
        </div>
    </>
}

export default Tags
