import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";
import Link from "next/link";

class ParagraphRenderer extends BaseRenderer implements Renderer {
    async render(block: Block) {
        const richTexts = block[block.type].rich_text

        return <p className={"mb-4"}>{richTexts.map((richText: RichText, index: number) => {
            if (richText.text.link && richText.text.link && richText.text.link.url) {
                return <Link key={index} className={"hover:underline cursor-pointer text-blue-700"}
                             href={richText.text.link.url}>{richText.plain_text}</Link>
            }
            const style = this.processAnnotation(richText.annotations)
            return <span key={index} className={"mb-2"} style={style}>{richText.plain_text}</span>
        })}</p>
    }
}

export default ParagraphRenderer
