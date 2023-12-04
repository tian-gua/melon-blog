import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Link from "next/link";
import React from "react";
import Script from "next/script"


const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: process.env.BLOG_NAME,
    description: '欢迎来到 Melon 的博客',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html>
        <Script async strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-7QMKKDBWPC"/>
        <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                
                  gtag('config', 'G-7QMKKDBWPC');
                  `
        }}/>
        <body className={inter.className}>
        <div className="h-full w-full flex justify-center font-mono bg-white">
            <div
                className="w-full max-w-[1024px] h-full pt-10 px-10 border-gray-500 flex justify-between flex-wrap box-border">
                {/*头像*/}
                <Link className="w-24 mask mask-hexagon" href="/blog/c17e78bf-961b-4af5-aada-252ef6af0093/关于我">
                    <img className="h-full w-full rounded-full"
                         src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw%2F93069569-a68a-4df3-8b8b-a40428037f06%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1692527575&t=6013556333c4744697f482db82c5205c"/>
                </Link>
                {/*导航*/}
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
                <div className="w-full mt-10">
                    {children}
                </div>

                <hr className="border-b-1 mt-10 mb-4 border-gray-200 w-full"></hr>
                <a className="text-[0.9em] mb-4" href="https://www.tiangua.info">Copyright © 2023 melon</a>
            </div>
        </div>
        </body>
        </html>
    )
}
