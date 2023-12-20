import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";
import {NotionRenderer} from "@/server/renderer/notion-renderer";
import Link from "next/link";

class QuoteRenderer extends BaseRenderer implements Renderer {
    private notionRenderer: NotionRenderer

    constructor(notionRenderer: NotionRenderer) {
        super()
        this.notionRenderer = notionRenderer
    }

    async render(block: Block) {
        if (block.quote.rich_text.length === 0) {
            return <></>
        }

        return <blockquote
            className="p-4 my-4 border-l-4 border-[#1AAD19] bg-[#edebff] dark:border-gray-500 dark:bg-gray-800">
            <p className="text-[0.9em] leading-relaxed text-gray-900 dark:text-white">{block.quote.rich_text.map((richText, index) => {
                return <span className="inline-block" key={index}
                             style={this.processAnnotation(richText.annotations)}>{richText.plain_text}</span>
            })}</p>
        </blockquote>
    }
}

export default QuoteRenderer
