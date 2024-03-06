'use client'

import React from "react";

const SearchBar = () => {
    const [content, setContent] = React.useState('')

    const search = () => {
        window.location.href = 'http://www.google.com/search?q=site:tiangua.info+' + content
    }

    const onChange = (e: any) => {
        setContent(e.target.value)
    }

    return <>
        <div className="w-full h-10 flex justify-end items-center">
            <input type="text" placeholder="Search here" className="input input-bordered w-full max-w-xs" onChange={onChange}/>
            <button className="btn btn-circle bg-white ml-4" onClick={search}>
                <svg className="" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="7795" width="24" height="24">
                    <path
                        d="M998.436571 878.372571l-244.809142-245.065142c-2.852571-2.852571-5.997714-5.010286-8.996572-7.350858a403.163429 403.163429 0 0 0 65.499429-220.672c0-223.890286-181.321143-405.321143-405.101715-405.321142C181.394286-0.036571-0.036571 181.394286-0.036571 405.284571c0 223.926857 181.430857 405.321143 405.065142 405.321143 81.408 0 157.110857-24.210286 220.672-65.609143 2.340571 3.072 4.461714 6.144 7.241143 8.96l244.882286 245.065143a85.065143 85.065143 0 0 0 120.576 0.036572c33.28-33.353143 33.28-87.369143 0.036571-120.685715m-593.408-195.766857c-152.758857 0-277.138286-124.416-277.138285-277.321143 0-152.868571 124.379429-277.321143 277.138285-277.321142 152.795429 0 277.174857 124.452571 277.174858 277.321142 0 152.905143-124.379429 277.321143-277.174858 277.321143"
                        fill="#2c2c2c" p-id="7796"></path>
                </svg>
            </button>
        </div>
    </>
}

export default SearchBar
