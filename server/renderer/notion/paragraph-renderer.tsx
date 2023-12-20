import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";
import Link from "next/link";

class ParagraphRenderer extends BaseRenderer implements Renderer {
    async render(block: Block) {
        const richTexts = block[block.type].rich_text
        return <p className={"mb-2"}>{this.renderRichText(richTexts)}</p>
    }
}

export default ParagraphRenderer
