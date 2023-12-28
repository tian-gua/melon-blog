import {Renderer} from "@/server/renderer/renderer";
import BaseRenderer from "@/server/renderer/notion/base-renderer";

class H2Renderer extends BaseRenderer implements Renderer {
    async render(block: Block) {
        const text = block[block.type].rich_text[0].plain_text
        const style = this.processAnnotation(block[block.type].rich_text[0].annotations)
        // style["letterSpacing"] = "2px"
        // style["textShadow"] = "2px 2px 0px #cccccc"
        return <h2 key={block.id} id={block.id} className={"sketchy text-[1.5em] font-bold block mt-6 mb-2"} style={style}>{text}</h2>
    }
}

export default H2Renderer
