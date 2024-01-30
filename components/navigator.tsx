import React from "react";
import Avatar from "@/components/avatar";

const Navigator = () => {
    return <>
        {/*头像*/}
        <div className={"w-full h-16 flex justify-between  bg-white px-10 fixed top-0 z-10 pb-1 border-b border-b-[#d8d6de] shadow-md"}>
            <a className={"flex justify-start items-center"} href={"/"}>
                <img className={"w-10 h-10 mr-2 rounded-full"}
                     src={"/M.png"}/>
                <h1 className={"fonts-serif fonts-bold text-[20px]"}>{'MelonBlog'}</h1>
            </a>
            <div className={"flex-1"}></div>
            <div className={"flex justify-center items-center"}>
                <div
                    className="flex justify-between items-center text-sm font-bold text-gray-600 mr-10">
                    <a href="/">作品集</a>
                </div>
                <Avatar/>
            </div>
        </div>
    </>
}

export default Navigator;
