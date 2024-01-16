import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import React from "react";
import Script from "next/script"
import Footer from "@/components/footer";
import Navigator from "@/components/navigator";


const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: process.env.BLOG_NAME,
    description: 'Melon\'s blog',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html className={"bg-gray-100"}>
        <head>
            <link rel='shortcut icon' href='/M.png'/>
            <Script async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8788229854530590"
                    crossOrigin="anonymous"></Script>
        </head>

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
        <div className="h-full w-full flex justify-center font-mono flex-col items-center">
            <Navigator/>
            <div
                className="w-full max-w-[800px] h-full mt-10 px-2 border-gray-500 flex flex-wrap box-border">
                {/*导航*/}

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
