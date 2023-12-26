'use client'

import BrowserUtils from "@/server/utils/browser-utils";
import React from "react";
import Styles from "./tags.module.css";

const Tags = (props: { tags: string[] | undefined }) => {
    const [userAgent, setUserAgent] = React.useState<string>('')
    React.useEffect(() => {
        setUserAgent(navigator.userAgent)
    }, []);

    return <>
        <span className="ml-2">
            {BrowserUtils.isMobile(userAgent) ? <></> :
                <span className={Styles.tags}>
                    {props.tags?.map((tag) => {
                        return <a key={tag} className={`${Styles.tag}`}>{tag}</a>
                    })}
                </span>
            }
        </span>
    </>
}

export default Tags
