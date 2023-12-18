import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";

class ImageRenderer extends BaseRenderer implements Renderer {
    async render(block: Block) {
        const style: any = {}
        if (block.image.caption.length > 0) {
            if (block.image.caption[0].plain_text.includes('[') && block.image.caption[0].plain_text.includes(']') && block.image.caption[0].plain_text.includes('x')) {
                style.width = block.image.caption[0].plain_text.split('[')[1].split(']')[0].split('x')[0] + 'px'
                style.height = block.image.caption[0].plain_text.split('[')[1].split(']')[0].split('x')[1] + 'px'
            }
        }
        const className = `mt-5 mb-5 rounded-lg max-w-full shadow-gray-300 shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px]`
        return <img width={style.width} height={style.height} key={block.id} src={block.image.file.url}
                    className={className} alt="image"/>
    }
}

export default ImageRenderer
