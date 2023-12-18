import 'highlight.js/styles/github-dark.css';
import notionRenderer from "@/server/renderer/notion-renderer";

const Blog = async ({params}: { params: { slug: string[] } }, options: RenderOptions) => {
    return <>
        <div className="font-mono mb-10">
            <h1 className="w-full mx-auto text-center text-[1.8em]">{decodeURIComponent(params.slug[1])}</h1>
            <div className="divider"></div>
            <div className="text-base antialiased">
                {await notionRenderer.render(params.slug[0])}
            </div>
        </div>
    </>
}

export default Blog
