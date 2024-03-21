import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";
import hljs from "highlight.js";
import {RenderContext} from "@/server/renderer/context";

class CodeRenderer extends BaseRenderer implements Renderer {

    async render(context: RenderContext, block: Block) {
        let code = ''
        for (const richText of block.code.rich_text) {
            code += richText.plain_text
        }
        const hlCode = hljs.highlightAuto(code).value
        const pres = hlCode.split('\n').map((line, index) => {
            return <pre key={index} data-prefix={index + 1}><code className="mr-8"
                                                                  dangerouslySetInnerHTML={{__html: line}}/></pre>
        })
        return <div key={block.id} className="w-full mockup-code mb-5 text-[0.9em] font-mono">{pres}</div>
    }
}

export default CodeRenderer
