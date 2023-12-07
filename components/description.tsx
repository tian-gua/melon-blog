import Link from "next/link";
import React from "react";

const Description = () => {
    return <>
        <div className="w-full h-max px-3">
            <h1 className="flex flex-col text-3xl font-bold leading-normal">
                <span>Hello</span>
                <span>I&lsquo;m Melon</span>
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
