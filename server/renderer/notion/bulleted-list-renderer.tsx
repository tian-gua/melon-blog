import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";

class BulletedListRenderer extends BaseRenderer implements Renderer {

    async render(block: Block) {
        const richTexts = block[block.type].rich_text
        return <li key={block.id}>{this.renderRichText(richTexts)}</li>
    }

    immediate(): boolean {
        return false
    }
}

export default BulletedListRenderer
