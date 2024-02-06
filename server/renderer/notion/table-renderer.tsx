import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";
import {NotionArticleRenderer} from "@/server/renderer/notion-article-renderer";

class TableRenderer extends BaseRenderer implements Renderer {

    async render(block: Block) {
        if (!block || !block.has_children) {
            return <></>
        }

        const {content} = await this.notionArticleRenderer.render(block.id)

        return <div className="overflow-x-auto">
            <table className="table">
                <tbody>{content}</tbody>
            </table>
        </div>
    }

}

export default TableRenderer
