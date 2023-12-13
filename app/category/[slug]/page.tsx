import React from "react";
import notionService from "@/server/service/notion-service";

export default async function ArticleList({params}: { params: { slug: string } }) {
    const domList = []

    const database = await notionService.getDatabase()
    const results: NotionData[] = database.data ? database.data.results : database.results

    const categoryArticles = []
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
            if (type === '文章') {
                let categoryName = category
                // 判断类型名称是否包含字符'-'
                if (category.indexOf('-') !== -1) {
                    categoryName = category.split('-')[1]
                }

                if (decodeURIComponent(params.slug) === categoryName) {
                    categoryArticles.push({
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
    }
    categoryArticles?.sort((a, b) => {
        return b.date.localeCompare(a.date)
    })
    for (const categoryArticle of categoryArticles) {
        domList.push(
            <div className="w-full h-10 px-3 flex justify-end items-center hover:bg-gray-100 rounded-md">
                <a className="grow"
                   href={`/blog/${categoryArticle.id}/${categoryArticle.title}`}>{categoryArticle.title}</a>
                <span className="text-gray-400">{categoryArticle.date}</span>
            </div>)
    }

    return <div className="text-base antialiased">
        <h1 className="w-full h-full px-3 font-extrabold text-[1.5em] mb-5">
            {decodeURIComponent(params.slug)}
        </h1>
        {
            domList
        }
    </div>
}
