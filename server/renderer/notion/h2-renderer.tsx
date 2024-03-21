import {Renderer} from "@/server/renderer/renderer";
import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {RenderContext} from "@/server/renderer/context";

class H2Renderer extends BaseRenderer implements Renderer {
    async render(context: RenderContext, block: Block) {
        const text = block[block.type].rich_text[0].plain_text
        const style = this.processAnnotation(block[block.type].rich_text[0].annotations)
        // style["letterSpacing"] = "2px"
        // style["textShadow"] = "2px 2px 0px #cccccc"
        return <div className="w-full flex justify-center items-center"><h2 key={block.id} id={block.id}
                                                                            className={"sketchy text-[1.2em] font-bold mt-6 mb-4"}
                                                                            style={style}>{text}</h2></div>
    }
}

export default H2Renderer
