import {Renderer} from "@/server/renderer/renderer";
import BaseRenderer from "@/server/renderer/notion/base-renderer";

class H3Renderer extends BaseRenderer implements Renderer {
    async render(block: Block) {
        const text = block[block.type].rich_text[0].plain_text
        const style = this.processAnnotation(block[block.type].rich_text[0].annotations)
        // style["textShadow"] = "2px 2px 0px #cccccc"
        return <div className="w-full flex justify-start items-center">
            <svg viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="26205" width="32" height="32">
                <path d="M682.666667 512L341.333333 768V256l341.333334 256z" fill="#000000" p-id="26206"></path>
            </svg>
            <h3 id={block.id} className={"text-[1.1em] font-bold block mt-2 mb-2"} style={style}>{text}</h3>
        </div>
    }
}

export default H3Renderer
