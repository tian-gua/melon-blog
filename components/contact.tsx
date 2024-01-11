import React from "react";

const Contact = () => {
    return <>
        <div className="flex justify-start px-3 mt-5">
            <a className="block p-2 rounded-full text-gray-600 transition-colors hover:bg-[#171715] hover:text-white"
               href="/">
                <svg xmlns="https://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                     strokeLinejoin="round" className="lucide lucide-github">
                    <path
                        d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
            </a>
            <a className="block p-2 rounded-full text-gray-600 transition-colors hover:bg-[#e86125] hover:text-white"
               href="mailto:e.yehaoo@gmail.com">
                <svg xmlns="https://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-at-sign">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"></path>
                </svg>
            </a>
            {/*<a className="block p-2 rounded-full text-gray-600 transition-colors hover:bg-[#1d9bf0] hover:text-white"*/}
            {/*   href="/">*/}
            {/*    <svg xmlns="https://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"*/}
            {/*         fill="none"*/}
            {/*         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"*/}
            {/*         className="lucide lucide-twitter">*/}
            {/*        <path*/}
            {/*            d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>*/}
            {/*    </svg>*/}
            {/*</a>*/}
            <a className="block p-2 rounded-full text-gray-600 transition-colors hover:bg-[#1d9bf0] hover:text-white" href={"/blog/c17e78bf-961b-4af5-aada-252ef6af0093#d5da913f-4304-4cd3-8ffe-36149db34bc6"}>
                <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="5261" width="20" height="20">
                    <path
                        d="M693.12 347.264c11.776 0 23.36 0.896 35.008 2.176-31.36-146.048-187.456-254.528-365.696-254.528C163.2 94.912 0 230.656 0 403.136c0 99.52 54.272 181.248 145.024 244.736L108.8 756.864l126.72-63.488c45.312 8.896 81.664 18.112 126.912 18.112 11.392 0 22.656-0.512 33.792-1.344-7.04-24.256-11.2-49.6-11.2-76.032C385.088 475.776 521.024 347.264 693.12 347.264zM498.304 249.024c27.392 0 45.376 17.984 45.376 45.248 0 27.136-17.984 45.312-45.376 45.312-27.072 0-54.336-18.176-54.336-45.312C443.968 266.944 471.168 249.024 498.304 249.024zM244.672 339.584c-27.2 0-54.592-18.176-54.592-45.312 0-27.264 27.392-45.248 54.592-45.248S289.92 266.944 289.92 294.272C289.92 321.408 271.872 339.584 244.672 339.584zM1024 629.76c0-144.896-145.024-262.976-307.904-262.976-172.48 0-308.224 118.144-308.224 262.976 0 145.28 135.808 262.976 308.224 262.976 36.096 0 72.512-9.024 108.736-18.112l99.392 54.528-27.264-90.624C969.728 783.872 1024 711.488 1024 629.76zM616.128 584.384c-17.984 0-36.224-17.92-36.224-36.224 0-18.048 18.24-36.224 36.224-36.224 27.52 0 45.376 18.176 45.376 36.224C661.504 566.464 643.648 584.384 616.128 584.384zM815.488 584.384c-17.856 0-36.032-17.92-36.032-36.224 0-18.048 18.112-36.224 36.032-36.224 27.264 0 45.376 18.176 45.376 36.224C860.864 566.464 842.752 584.384 815.488 584.384z"
                        fill="#272636" p-id="5262"></path>
                </svg>
            </a>
        </div>
    </>
}

export default Contact;
