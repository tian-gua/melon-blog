import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";
import {RenderContext} from "@/server/renderer/context";

class NumberedListRenderer extends BaseRenderer implements Renderer {

    async render(context: RenderContext, block: Block) {
        const richTexts = block[block.type].rich_text

        let children = undefined
        if (block.has_children) {
            const res = await context!.renderer.render(block.id)
            children = res.content
        }

        return <div key={block.id} className="flex flex-col text-gray-600 text-[0.9em] italic">
            <div className="relative pl-[1.2em]">
                <span
                    className="absolute left-0 top-2 text-sm flex items-center text-gray-600 font-bold">{context!.numberListCount}.</span>
                {this.renderRichText(richTexts)}
            </div>
            {children ? <div className="ml-[2em]">{children}</div> : <></>}
        </div>
    }
}

export default NumberedListRenderer
