import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Link from "next/link";
import React from "react";
import Script from "next/script"
import Footer from "@/components/footer";
import Navigator from "@/components/navigator";
import Avatar from "@/components/avatar";


const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: process.env.BLOG_NAME,
    description: '欢迎来到 Melon 的博客',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html>
        <Script async strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-YS74P2SD7M"/>
        <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                
                  gtag('config', 'G-YS74P2SD7M');
                  `
        }}/>
        <Script id="baidu-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `
                   var _hmt = _hmt || [];
                    (function() {
                      var hm = document.createElement("script");
                      hm.src = "https://hm.baidu.com/hm.js?05eddadd4dd8d3f7c8a3bcdf563b1b6e";
                      var s = document.getElementsByTagName("script")[0]; 
                      s.parentNode.insertBefore(hm, s);
                    })();
                  `
        }}/>
        <body className={inter.className}>
        <div className="h-full w-full flex justify-center font-mono bg-white">
            <div
                className="w-full max-w-[1024px] h-full pt-10 px-10 border-gray-500 flex justify-between flex-wrap box-border">
                {/*头像*/}
                <Avatar/>
                {/*导航*/}
                <Navigator/>
                <div className="w-full mt-10">
                    {children}
                </div>

                <Footer/>
            </div>
        </div>
        </body>
        </html>
    )
}
