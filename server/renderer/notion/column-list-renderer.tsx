import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";
import {NotionRenderer} from "@/server/renderer/notion-renderer";

class ColumnListRenderer extends BaseRenderer implements Renderer {

    private notionRenderer: NotionRenderer

    constructor(notionRenderer: NotionRenderer) {
        super()
        this.notionRenderer = notionRenderer
    }

    async render(block: Block) {
        return <div key={block.id} className="w-full h-auto flex gap-20 mt-10">{await this.notionRenderer.render(block.id)}</div>
    }
}

export default ColumnListRenderer
