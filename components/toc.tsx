'use client'

import React from "react";
import BrowserUtils from "@/server/utils/browser-utils";
import Styles from "@/components/toc.module.css";
import TocData from "@/server/renderer/toc";

const Toc = (props: { id: string, data: TocData }) => {
    const [hide, setHide] = React.useState<boolean>(true)
    const [activeId, setActiveId] = React.useState<string>('')
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

        window.addEventListener('scroll', () => {
            const headerOffset = 30;

            props.data.children.forEach((child) => {
                const elementPosition = document.getElementById(child.id)!.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                if (window.scrollY >= offsetPosition) {
                    setActiveId(child.id)
                }
            })
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

        setActiveId(id)
    }

    const render = () => {
        return <div className={`${Styles.index}`}>
            {props.data.children.map((child) => {
                return <a key={child.id}
                          onClick={() => {
                              scrollToTargetAdjusted(child.id)
                          }}
                          className={`${child.level == 2 ? Styles.h2 : child.level == 3 ? Styles.h3 : undefined} ${activeId === child.id ? Styles.active : null}`}>{child.title}</a>
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
