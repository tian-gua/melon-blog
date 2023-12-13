'use client'

import Link from "next/link";
import {TypeAnimation} from "react-type-animation";


const Description = () => {
    return <>
        <div className="w-full h-max px-3">
            <h1 className="flex flex-col text-xl leading-normal font-serif">
                {/*<span className="">Hello, this is melon&lsquo;s blog</span>*/}
                <TypeAnimation
                    className="text-[#a2a2a2]"
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        `您好,我是Melon / Hello, I am Melon, this is Melon's blog`,
                        5000, // wait 1s before replacing "Mice" with "Hamsters"
                        '我有一个研发小工作室,并且可以为您提供服务',
                        5000,
                        '我们可以开发网站、小程序、APP等等项目,若果您有需求可以联系我哦',
                        5000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                />
            </h1>
            <div className="mt-2 text-gray-600 antialiased text-[0.9em]">
                <p className="flex flex-wrap py-1"><span>🧑‍💻&nbsp;全栈开发者&nbsp;/&nbsp;</span><span>Full-stack Developer</span>
                </p>
                <p className="flex flex-wrap py-1">🤩&nbsp;正在做一些有趣的事 / Working on something interesting</p>
                <p className="flex flex-wrap py-1">🥰&nbsp;<Link href="http://www.tiangua.info">www.tiangua.info</Link>
                </p>
            </div>
        </div>
    </>
}

export default Description;
