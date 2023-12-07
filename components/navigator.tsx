import React from "react";

const Navigator = () => {
    return <>
        <div className="h-16 w-auto flex">
            <div className="h-full w-52 grid content-center">
                <div
                    className="h-10 rounded-full flex justify-between items-center px-8 text-sm border hover:shadow-md font-bold text-gray-600">
                    <a href="/">首页</a>
                    <a href="/">博客</a>
                    <a href="/">作品集</a>
                </div>
            </div>
        </div>
    </>
}

export default Navigator;
