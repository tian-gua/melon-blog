import {Renderer} from "@/server/renderer/renderer";
import BaseRenderer from "@/server/renderer/notion/base-renderer";

class H1Renderer extends BaseRenderer implements Renderer {
    async render(block: Block) {
        const text = block[block.type].rich_text[0].plain_text
        const style = this.processAnnotation(block[block.type].rich_text[0].annotations)

        return <h1 id={block.id} className={"text-[1.5em] text-black fonts-bold block mt-10 mb-2"} style={style}>{text}</h1>
    }
}

export default H1Renderer
