import {Renderer} from "@/server/renderer/renderer";
import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {RenderContext} from "@/server/renderer/context";

class H1Renderer extends BaseRenderer implements Renderer {
    async render(context: RenderContext, block: Block) {
        const text = block[block.type].rich_text.map((text: any) => text.plain_text).join("")
        const style = this.processAnnotation(block[block.type].rich_text[0].annotations)

        return <h1 id={block.id} className={"text-[1.5em] text-black font-bold block mt-10 mb-2"}
                   style={style}>{text}</h1>
    }
}

export default H1Renderer
