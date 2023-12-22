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

        window.addEventListener('scroll', (event) => {
            // 如果滑到了底部,就把最后一个id设置为active
            const bottom = document.documentElement.scrollHeight - document.documentElement.clientHeight
            if (window.scrollY >= bottom) {
                setActiveId(props.data.children[props.data.children.length - 1].id)
                return
            }

            const distances: { id: string, distance: number }[] = []
            const headerOffset = 30;
            props.data.children.forEach((child) => {
                const header = document.getElementById(child.id)!
                const headerTopPosition = header.getBoundingClientRect().top;
                const offsetPosition = headerTopPosition + window.scrollY - headerOffset;
                // console.log(`${child.title} ${offsetPosition} ${window.scrollY} ${window.scrollY - offsetPosition}`)
                const distance = Math.abs(window.scrollY - offsetPosition)
                distances.push({id: child.id, distance: distance})
                if (distance <= 10) {
                    if (activeId !== child.id) {
                        setActiveId(child.id)
                        return
                    }
                }
            })


            // 如果滑动过快,可能会监听不到当前真实的id,所以这里做一下排序,取距离最小的那个,非常增加丝滑度
            distances.sort((a, b) => {
                return a.distance - b.distance
            })
            setActiveId(distances[0].id)
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

        // setActiveId(id) 让滚动时间自己触发,这样效果会丝滑很多
    }

    const render = () => {
        return <div className={`${Styles.index}`}>
            <h1 className={"text-[20px] mb-5 font-black text-black"}>目录</h1>
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
