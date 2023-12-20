import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";
import {NotionRenderer} from "@/server/renderer/notion-renderer";

class ColumnRenderer extends BaseRenderer implements Renderer {

    private notionRenderer: NotionRenderer

    constructor(notionRenderer: NotionRenderer) {
        super()
        this.notionRenderer = notionRenderer
    }

    async render(block: Block) {
        const {content} = await this.notionRenderer.render(block.id)
        return <div className="w-full h-auto flex gap-20 mt-10">{content}</div>
    }
}

export default ColumnRenderer
