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
            <a className="block p-2 rounded-full text-gray-600 transition-colors hover:bg-[#1d9bf0] hover:text-white"
               href="/">
                <svg xmlns="https://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-twitter">
                    <path
                        d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
            </a>
        </div>
    </>
}

export default Contact;
