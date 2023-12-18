import {Renderer} from "@/server/renderer/renderer";
import BaseRenderer from "@/server/renderer/notion/base-renderer";

class H2Renderer extends BaseRenderer implements Renderer {
    async render(block: Block) {
        const text = block[block.type].rich_text[0].plain_text
        const style = this.processAnnotation(block[block.type].rich_text[0].annotations)
        return <h2 key={block.id} className={"w-full text-[1.3em] font-bold block mt-4 mb-2"} style={style}>{text}</h2>
    }
}

export default H2Renderer
