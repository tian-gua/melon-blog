import Link from "next/link";
import React from "react";

const Avatar = () => {
    return <>
        <Link className="w-12 flex justify-center items-center" href="/blog/c17e78bf-961b-4af5-aada-252ef6af0093/关于我">
            <img className="rounded-full"
                 src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw%2F93069569-a68a-4df3-8b8b-a40428037f06%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1692527575&t=6013556333c4744697f482db82c5205c"/>
        </Link>
    </>
}

export default Avatar;
