import React from "react";

const Footer = () => {
    return <>
        <div className="w-full mt-20 ">
            <h3>友情链接</h3>
            <hr className="border-b-1 mb-2 border-gray-200 w-full"></hr>
            <div className="w-full">
                <div className="flex flex-wrap justify-start mt-4 text-blue-900 text-sm">
                    <a className="mr-4" href="http://ai-stock.tiangua.info">AI财报</a>
                    <a className="mr-4" href="http://www.bytesworkshop.com">字节工坊</a>
                    <a className="mr-4" href="https://ant-design.antgroup.com/index-cn">Ant Design</a>
                    <a className="mr-4" href="https://tailwindcss.com/">tailwindcss</a>
                </div>
            </div>
            <p className="mt-10 text-[0.9em] mb-6 flex justify-center">Copyright © 2023 www.tiangua.info
                鄂ICP备2022015834号</p>
        </div>
    </>
}

export default Footer;
