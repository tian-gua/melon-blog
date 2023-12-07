import React from "react";
import {NotionData, Blog} from "@/types/type";
import {getDatabaseData} from "@/api/notion";
import Link from "next/link";
import Description from "@/components/description";
import Contact from "@/components/contact";

export default async function Home() {
    const database = await getDatabaseData()
    let aboutMe = ''
    const blogGroup = new Map<string, Blog[]>()
    const results: NotionData[] = database.data ? database.data.results : database.results
    for (const resultItem of results) {

        const blogId = resultItem.id
        const blogProperties = resultItem.properties
        // console.log(blogProperties)
        if (blogProperties.Status.select && blogProperties.Status.select.name === 'Published') {
            const blogTitle = blogProperties.Title.title[0].plain_text
            const date = blogProperties.Date.date.start
            const category = blogProperties.Category.select.name
            const type = blogProperties.Type.select.name
            const status = blogProperties.Status.select.name
            const tags = blogProperties.Tags.multi_select.map(i => i.name)

            if (type === '关于我') {
                aboutMe = blogId
            } else if (type === '文章') {
                if (!blogGroup.has(category)) {
                    blogGroup.set(category, [])
                }
                blogGroup.get(category)?.push({
                    id: blogId,
                    title: blogTitle,
                    date: date,
                    type: type,
                    category: category,
                    tags: tags,
                    Status: status
                })
            }
        }
    }

    const renderCategoryBlogs = (category: string) => {
        let blogs: Blog[] | undefined = blogGroup.get(category)
        if (blogs === undefined) {
            return <></>
        }
        blogs?.sort((a, b) => {
            return b.date.localeCompare(a.date)
        })
        blogs = blogs.slice(0, 8)

        const domList: React.JSX.Element[] = []
        for (const blog of blogs) {
            domList.push(
                <div className="w-full h-10 px-3 flex justify-between items-center hover:bg-gray-100 rounded-md">
                    <a className="flex-1" href={`/blog/${blog.id}/${blog.title}`}>{blog.title}</a>
                    <span className="text-gray-400">{blog.date}</span>
                </div>
            )
        }

        let categoryName = category
        // 判断类型名称是否包含字符'-'
        if (category.indexOf('-') !== -1) {
            categoryName = category.split('-')[1]
        }

        return <div className="w-full mt-5 text-[1em]">
            <div className="w-full h-10 px-3 flex justify-end items-center">
                <h1 className="font-bold text-[1.5em] grow">
                    {categoryName}
                </h1>
                <a className="text-gray-400" href={"/category/" + categoryName}>更多</a>
            </div>
            {domList}
        </div>
    }

    const renderCategories = () => {
        const domList: React.JSX.Element[] = []
        let keys: string[] = []
        blogGroup.forEach((value, key) => {
            keys.push(key)
        })
        // sort keys
        keys.sort((a, b) => {
            return a.localeCompare(b)
        })
        for (let key of keys) {
            domList.push(renderCategoryBlogs(key))
        }
        return domList
    }

    return (
        <div className="font-mono">
            {/*简介区域*/}
            <Description/>
            {/*图标跳转区域*/}
            <Contact/>
            <div className="text-base antialiased">
                {renderCategories()}
            </div>
        </div>
    )
}
