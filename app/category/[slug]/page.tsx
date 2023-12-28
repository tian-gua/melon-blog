import React from "react";
import notionService from "@/server/service/notion-service";
import Tags from "@/components/tags";

export default async function ArticleList({params}: { params: { slug: string } }) {
    const categoryBlogs: Blog[] | undefined = await notionService.getCategoryBlogs(decodeURIComponent(params.slug))
    const tags = await notionService.getBlogTags()
    return <div className="text-base antialiased bg-white p-10 border border-[#d8d6de] shadow-md rounded-lg">
        <h1 className="w-full h-full px-3 font-extrabold text-[1.5em] mb-5">
            {decodeURIComponent(params.slug).split('-')[1]}
        </h1>
        {
            categoryBlogs?.map((blog) => {
                return <div key={blog.id}
                            className="w-full h-10 px-3 flex justify-end items-center hover:bg-gray-100 rounded-md">
                    <a className="grow"
                       href={`/blog/${blog.id}/${blog.title}`}>{blog.title}</a>
                    <Tags tags={tags.get(blog.id)}/>
                    <span className="text-gray-400">{blog.date}</span>
                </div>
            })
        }
    </div>
}
