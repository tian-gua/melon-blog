import React from "react";
import Description from "@/components/description";
import Contact from "@/components/contact";
import notionService from "@/server/service/notion-service";
import Tags from "@/components/tags";
import Card from "@/components/card";
import AccessLog from "@/components/access_log";
import SearchBar from "@/components/search_bar"

export default async function Home() {
    const categories = await notionService.getCategories()
    const categoryBlogs: Map<string, Blog[]> = new Map<string, Blog[]>()
    for (const category of categories) {
        const blogs = await notionService.getCategoryBlogs(category)
        categoryBlogs.set(category, blogs!)
    }
    const tags = await notionService.getBlogTags()

    return (
        <div className="font-mono">
            {/*简介区域*/}
            <Description/>
            {/*图标跳转区域*/}
            <Contact/>
            {/*搜索区域*/}
            <SearchBar/>
            <div className="text-base antialiased">
                {categories.map((category: string) => {
                    let num = 4
                    if (category.indexOf('编程') != -1) {
                        num = 16
                    }
                    return <Card key={category}>
                        <div className="w-full h-10 px-3 flex justify-end items-center">
                            <h1 className="font-bold text-[1.5em] grow">
                                {category.split('-')[1]}
                            </h1>
                            <a className="text-gray-400" href={"/category/" + category}>更多<span
                                className="text-sm">({categoryBlogs.get(category)?.length})</span></a>
                        </div>
                        {
                            categoryBlogs.get(category)!.slice(0, num).map((blog: Blog) => {
                                return <div key={blog.id}
                                            className="w-full h-10 px-3 flex justify-between items-center hover:bg-gray-100 rounded">
                                    <div
                                        className="flex-1 flex justify-start items-center text-ellipsis whitespace-nowrap overflow-x-hidden">
                                        <a className="flex justify-start flex-row items-center"
                                           href={`/blog/${blog.id}`}>
                                            <span className="">{blog.title}</span>
                                            {blog.isNew ? <svg className="ml-2" viewBox="0 0 1792 1024"
                                                               version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                               width="24" height="24">
                                                <path
                                                    d="M1648.65 405.687l-192.516 499.641h-163.828c7.313-61.031 18.141-141.469 32.625-241.312-15.68 43.945-33.047 88.242-52.102 132.891l-45.352 108.422h-164.18l68.344-499.641h130.078c-2.531 13.078-16.805 108.422-42.891 286.172 6.539-18.281 43.102-113.695 109.688-286.172h124.945l-45.211 286.172c27-83.602 63.773-178.945 110.391-286.172h129.937zM1055.072 652.273h-206.859l-30.234 120.727c-6.328 25.313-8.719 41.484-7.172 48.867 1.617 7.313 7.313 10.898 17.086 10.898 0.391 0.018 0.85 0.027 1.312 0.027 11.11 0 20.884-5.727 26.529-14.391 6.613-9.825 13.363-28.528 20.324-56.372l18.422-73.547h151.453l-10.336 41.203c-8.648 34.453-17.297 61.031-26.016 79.523-8.719 18.563-23.203 38.32-43.594 59.344-20.32 21.094-43.313 36.844-68.977 47.32-25.734 10.547-55.969 15.82-90.703 15.82-33.75 0-62.297-5.203-85.5-15.539-23.273-10.406-39.797-24.609-49.641-42.75-9.844-18.070-14.766-37.969-14.836-59.766-0.070-21.727 5.063-53.367 15.469-94.922l40.852-162.773c12.234-48.797 28.125-87.328 47.531-115.523 25.316-36.388 62.219-63.176 105.292-75.156 3.833-4.648 38.146-12.172 74.778-12.172 44.859 0 79.523 9.070 104.063 27.141 24.609 18.141 39.094 42.117 43.313 72 4.219 29.812-0.422 71.859-14.063 126l-18.492 74.039zM922.954 451.953c-11.039 0-18.844 3.586-23.203 10.758-4.43 7.102-10.617 26.437-18.492 57.867l-10.266 40.781h46.688l10.195-40.781c7.313-28.969 10.547-47.602 9.703-55.969-0.773-8.438-5.625-12.656-14.625-12.656zM790.415 339.242c-35.156 15.961-63.563 38.953-84.938 68.906-21.445 30.023-38.883 71.016-52.383 122.906l-45 173.32c-11.391 44.156-17.086 77.836-17.016 100.969 0.141 23.063 5.555 44.297 16.383 63.563 10.828 19.266 29.039 34.383 54.563 45.422 1.125 0.422 2.32 0.703 3.375 1.195l-4.289 16.172h-191.672l-11.742-382.57-102.023 382.5h-182.883l224.438-841.5h182.883l21.516 378.984 101.109-378.984h182.813l-63.281 237.305c-30.923 9.428-57.844 23.184-81.712 40.835z"
                                                    fill="#d4237a"></path>
                                            </svg> : <></>}
                                        </a>
                                    </div>
                                    <Tags tags={tags.get(blog.id)}/>
                                    <span className="text-gray-400 text-sm">{blog.date}</span>
                                </div>
                            })
                        }
                    </Card>
                })}
            </div>
            <AccessLog page_id={'home'}/>
        </div>
    )
}
