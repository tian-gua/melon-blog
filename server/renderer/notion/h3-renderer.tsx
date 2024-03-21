import {Renderer} from "@/server/renderer/renderer";
import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {RenderContext} from "@/server/renderer/context";

class H3Renderer extends BaseRenderer implements Renderer {
    async render(context: RenderContext, block: Block) {
        const text = block[block.type].rich_text[0].plain_text
        const style = this.processAnnotation(block[block.type].rich_text[0].annotations)
        return <div className="w-full flex justify-start items-center">
            <h3 id={block.id} className={"text-[1.2em] font-bold block mt-4 mb-2"} style={style}>{text}</h3>
        </div>
    }
}

export default H3Renderer
