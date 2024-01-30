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
            if (BrowserUtils.isMobile(navigator.userAgent) || document.body.clientWidth <= 1024 + 300) {
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
            const headerOffset = 80;
            props.data.children.forEach((child) => {
                const header = document.getElementById(child.id)!
                const headerTopPosition = header.getBoundingClientRect().top;
                const offsetPosition = headerTopPosition + window.scrollY - headerOffset;
                // console.log(`${child.title} ${offsetPosition} ${window.scrollY} ${window.scrollY - offsetPosition}`)
                const distance = Math.abs(window.scrollY - offsetPosition)
                distances.push({id: child.id, distance: distance})
                if (distance <= 5) {
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
            // if (distances[0].distance < 80) {
            //     setActiveId(distances[0].id)
            // }
            setActiveId(distances[0].id)
        })
    }, [props.id]);


    const scrollToTargetAdjusted = (id: string) => {
        const element = document.getElementById(id);
        const headerOffset = 80;
        const elementPosition = element!.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });

        // setActiveId(id) 让滚动时间自己触发,这样效果会丝滑很多
    }

    const render = () => {
        return <div id="toc" className={`${Styles.index} w-full shadow-md rounded`}>
            <h1 className={"text-[20px] mb-5 fonts-black text-black"}>目录</h1>
            {props.data.children.map((child) => {
                return <a key={child.id} onClick={() => {
                    scrollToTargetAdjusted(child.id)
                }}
                          className={`${child.level == 2 ? Styles.h2 : child.level == 3 ? Styles.h3 : undefined} ${activeId === child.id ? Styles.active : null} flex justify-start items-center w-full`}>
                    {child.level == 2 ?
                        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                             width="14" height="14">
                            <path
                                d="M512 277.333333a234.666667 234.666667 0 1 0 0 469.333334 234.666667 234.666667 0 0 0 0-469.333334z"
                                fill="#000000" fillOpacity=".85"></path>
                        </svg> : <></>}

                    {child.level == 3 ?
                        <div>
                            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6708"
                                 width="14" height="14">
                                <path
                                    d="M288 512a224 224 0 1 1 448 0 224 224 0 0 1-448 0zM512 352a160 160 0 1 0 0 320 160 160 0 0 0 0-320z"
                                    fill="#000000"></path>
                            </svg>
                        </div> : <></>}
                    <span className={`${child.level == 1 ? "text-[15px] mb-1" : ""}`}>{child.title}</span>
                </a>
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
