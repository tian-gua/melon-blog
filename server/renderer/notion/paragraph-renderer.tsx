import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";
import Link from "next/link";
import {RenderContext} from "@/server/renderer/context";

class ParagraphRenderer extends BaseRenderer implements Renderer {
    async render(context: RenderContext, block: Block) {
        const richTexts = block[block.type].rich_text
        return <p className={"mb-2"}>{this.renderRichText(richTexts)}</p>
    }
}

export default ParagraphRenderer
