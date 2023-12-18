import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";
import {NotionRenderer} from "@/server/renderer/notion-renderer";

class TableRenderer extends BaseRenderer implements Renderer {

    private notionRenderer: NotionRenderer

    constructor(notionRenderer: NotionRenderer) {
        super()
        this.notionRenderer = notionRenderer
    }

    async render(block: Block) {
        if (!block || !block.has_children) {
            return <></>
        }

        return <div className="overflow-x-auto">
            <table className="table">
                <tbody>{await this.notionRenderer.render(block.id)}</tbody>
            </table>
        </div>
    }

}

export default TableRenderer
