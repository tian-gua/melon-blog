import React from "react";
import notionService from "@/server/service/notion-service";

export default async function ArticleList({params}: { params: { slug: string } }) {
    const categoryBlogs: Blog[] | undefined = await notionService.getCategoryBlogs(decodeURIComponent(params.slug))
    return <div className="text-base antialiased">
        <h1 className="w-full h-full px-3 font-extrabold text-[1.5em] mb-5">
            {decodeURIComponent(params.slug).split('-')[1]}
        </h1>
        {
            categoryBlogs?.map((blog) => {
                return <div key={blog.id}
                            className="w-full h-10 px-3 flex justify-end items-center hover:bg-gray-100 rounded-md">
                    <a className="grow"
                       href={`/blog/${blog.id}/${blog.title}`}>{blog.title}</a>
                    <span className="text-gray-400">{blog.date}</span>
                </div>
            })
        }
    </div>
}
