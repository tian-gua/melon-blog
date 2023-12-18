import {Renderer} from "@/server/renderer/renderer";
import BaseRenderer from "@/server/renderer/notion/base-renderer";

class H3Renderer extends BaseRenderer implements Renderer {
    async render(block: Block) {
        const text = block[block.type].rich_text[0].plain_text
        const style = this.processAnnotation(block[block.type].rich_text[0].annotations)
        return <h3 className={"w-full text-[1.1em] font-bold block mt-4 mb-2"} style={style}>{text}</h3>
    }
}

export default H3Renderer
