import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";
import notionArticleRenderer, {NotionArticleRenderer} from "@/server/renderer/notion-article-renderer";

class BulletedListRenderer extends BaseRenderer implements Renderer {

    async render(block: Block) {
        const richTexts = block[block.type].rich_text

        let children = undefined
        if (block.has_children) {
            const res = await notionArticleRenderer.render(block.id)
            children = res.content
        }

        return <div key={block.id} className="flex flex-col">
            <div className="relative pl-[1em]">
                <svg className="absolute top-2 left-0 fill-gray-600" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path
                        d="M512 640c-70.656 0-128-57.344-128-128s57.344-128 128-128 128 57.344 128 128-57.344 128-128 128z"
                        fill=""></path>
                </svg>
                {this.renderRichText(richTexts)}
            </div>
            {children ? <div className="ml-[2em]">{children}</div> : <></>}
        </div>
    }
}

export default BulletedListRenderer
