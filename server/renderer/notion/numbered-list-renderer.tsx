import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";
import notionArticleRenderer from "@/server/renderer/notion-article-renderer";

class NumberedListRenderer extends BaseRenderer implements Renderer {

    async render(block: Block) {
        const richTexts = block[block.type].rich_text

        let children = undefined
        if (block.has_children) {
            const res = await notionArticleRenderer.render(block.id)
            children = res.content
        }

        return <div key={block.id} className="flex flex-col">
            <div className="relative pl-[1.2em]">
                <span className="absolute left-0 top-2 text-sm flex items-center text-gray-600 font-bold">{this.notionArticleRenderer.count}.</span>
                {this.renderRichText(richTexts)}
            </div>
            {children ? <div className="ml-[2em]">{children}</div> : <></>}
        </div>
    }
}

export default NumberedListRenderer
