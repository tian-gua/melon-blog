import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";
import {RenderContext} from "@/server/renderer/context";

class ImageRenderer extends BaseRenderer implements Renderer {
    async render(context: RenderContext, block: Block) {
        const style: any = {}
        const caption = block.image.caption[0]
        if (caption && caption.text?.content) {
            const result = [...caption.text.content.matchAll(/\{w:([0-9]+)}/g)][0]
            if (result && result[1]) {
                style.width = result![1] + 'px'
            }
        }
        const className = `mt-5 mb-5 rounded-lg max-w-full shadow-gray-300 shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px]`
        return <img width={style.width} height={style.height} key={block.id} src={block.image.file.url}
                    className={className} alt="image"/>
    }
}

export default ImageRenderer
