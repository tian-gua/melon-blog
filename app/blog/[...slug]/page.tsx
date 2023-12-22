import 'highlight.js/styles/github-dark.css';
import notionArticleRenderer from "@/server/renderer/notion-article-renderer";
import Toc from "@/components/toc";

const Blog = async ({params}: { params: { slug: string[] } }) => {
    const id = params.slug[0]
    const title = decodeURIComponent(params.slug[1])

    const {content, toc} = await notionArticleRenderer.render(id, title, true)
    console.log('toc: ', toc)
    return <>
        <div className="font-mono mb-10">
            <h1 id={id} className="w-full mx-auto text-center text-[1.8em]">{title}</h1>
            <div className="divider"></div>
            <div className="text-base antialiased">
                {content}
                <Toc id={id} data={toc!}/>
            </div>
        </div>

    </>
}

export default Blog
