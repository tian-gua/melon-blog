'use client'

import React from "react";
import BrowserUtils from "@/server/utils/browser-utils";
import Styles from "@/components/toc.module.css";
import TocData from "@/server/renderer/toc";
import Link from "next/link";

const Toc = (props: { id: string, data: TocData }) => {
    const [hide, setHide] = React.useState<boolean>(true)
    React.useEffect(() => {
        if (BrowserUtils.isMobile(navigator.userAgent) || document.body.clientWidth <= 1024) {
            setHide(true)
        } else {
            setHide(false)
        }

        window.addEventListener('resize', () => {
            if (BrowserUtils.isMobile(navigator.userAgent) || document.body.clientWidth <= 1024) {
                setHide(true)
            } else {
                setHide(false)
            }
        })
    }, [props.id]);


    const scrollToTargetAdjusted = (id: string) => {
        const element = document.getElementById(id);
        const headerOffset = 30;
        const elementPosition = element!.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    const render = () => {
        return <div className={Styles.index}>
            <a onClick={() => {
                scrollToTargetAdjusted(props.data.id)
                // document.getElementById(props.data.id)?.scrollIntoView({behavior: 'smooth', inline: 'start'})
            }}>{props.data.title}</a>
            {props.data.children.map((child) => {
                return <a key={child.id}
                             onClick={() => {
                                 scrollToTargetAdjusted(child.id)
                                 // document.getElementById(child.id)?.scrollIntoView({behavior: 'smooth', inline: 'start'})
                             }}
                             className={child.level == 2 ? Styles.h2 : child.level == 3 ? Styles.h3 : undefined}>{child.title}</a>
            })}
        </div>
    }

    return <>
        <div hidden={hide}>
            {render()}
        </div>
    </>
}

export default Toc
