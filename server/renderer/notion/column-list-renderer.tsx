import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";
import {RenderContext} from "@/server/renderer/context";

class ColumnListRenderer extends BaseRenderer implements Renderer {

    async render(context: RenderContext, block: Block) {
        const {content} = await context!.renderer.render(block.id)
        return <div key={block.id} className="w-full h-auto flex gap-20 mt-10">{content}</div>
    }
}

export default ColumnListRenderer
