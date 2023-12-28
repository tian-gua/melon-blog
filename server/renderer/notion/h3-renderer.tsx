import {Renderer} from "@/server/renderer/renderer";
import BaseRenderer from "@/server/renderer/notion/base-renderer";

class H3Renderer extends BaseRenderer implements Renderer {
    async render(block: Block) {
        const text = block[block.type].rich_text[0].plain_text
        const style = this.processAnnotation(block[block.type].rich_text[0].annotations)
        // style["textShadow"] = "2px 2px 0px #cccccc"
        return <h3 id={block.id} className={"text-[1.1em] font-bold block mt-2 mb-1"} style={style}>{text}</h3>
    }
}

export default H3Renderer
