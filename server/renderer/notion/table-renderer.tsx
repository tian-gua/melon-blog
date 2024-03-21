import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";
import {RenderContext} from "@/server/renderer/context";

class TableRenderer extends BaseRenderer implements Renderer {

    async render(context: RenderContext, block: Block) {
        if (!block || !block.has_children) {
            return <></>
        }

        const {content} = await context!.renderer.render(block.id)

        return <div className="overflow-x-auto">
            <table className="table">
                <tbody>{content}</tbody>
            </table>
        </div>
    }

}

export default TableRenderer
