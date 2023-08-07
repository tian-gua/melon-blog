import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Link from "next/link";
import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Melon Blog',
    description: '欢迎来到 Melon 的博客',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html>
        <body className={inter.className}>
        <div className="h-full w-full flex justify-center font-mono">
            <div
                className="bg-white w-1/2 max-w-4xl h-full mt-10 border-gray-500 flex justify-between flex-wrap box-border">
                {/*头像*/}
                <Link className="w-24 mask mask-hexagon" href="/intro">
                    <img className="h-full w-full rounded-full"
                         src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw%2F93069569-a68a-4df3-8b8b-a40428037f06%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1692527575&t=6013556333c4744697f482db82c5205c"/>
                </Link>
                {/*导航*/}
                <div className="h-16 w-auto flex justify-end">
                    <div className="h-full w-52 grid content-center">
                        <div className="h-10 rounded-full flex justify-between items-center px-8 text-sm shadow-md">
                            <a href="/">首页</a>
                            <a href="/">博客</a>
                            <a href="/">作品集</a>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-10">
                    {children}
                </div>
            </div>
        </div>
        </body>
        </html>
    )
}
