import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";
import {NotionArticleRenderer} from "@/server/renderer/notion-article-renderer";

class ColumnListRenderer extends BaseRenderer implements Renderer {
    private notionArticleRenderer: NotionArticleRenderer

    constructor(notionArticleRenderer: NotionArticleRenderer) {
        super()
        this.notionArticleRenderer = notionArticleRenderer
    }

    async render(block: Block) {
        const {content} = await this.notionArticleRenderer.render(block.id)
        return <div key={block.id} className="w-full h-auto flex gap-20 mt-10">{content}</div>
    }
}

export default ColumnListRenderer
