import 'highlight.js/styles/github-dark.css';
import notionArticleRenderer from "@/server/renderer/notion-article-renderer";
import Toc from "@/components/toc";
import notionService from "@/server/service/notion-service";
import AccessLog from "@/components/access_log";

const Blog = async ({params}: { params: { slug: string } }) => {
    const id = params.slug
    const blog = await notionService.getBlog(id)
    const {content, toc} = await notionArticleRenderer.render(id, blog?.title, true)
    return <>
        <div id="article" className="font-mono mb-10 p-10 bg-white shadow-md rounded">
            <h1 id={id} className="w-full mx-auto text-center text-[1.8em]">{blog?.title}</h1>
            <div className="divider"></div>
            <div className="text-base antialiased leading-7">
                {content}
                <Toc id={id} data={toc!}/>
            </div>
        </div>
        <AccessLog page_id={id}/>
    </>
}

export default Blog
