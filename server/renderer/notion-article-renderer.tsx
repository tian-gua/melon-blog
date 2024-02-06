import notionService from "@/server/service/notion-service";
import H1Renderer from "@/server/renderer/notion/h1-renderer";
import H2Renderer from "@/server/renderer/notion/h2-renderer";
import H3Renderer from "@/server/renderer/notion/h3-renderer";
import {Renderer} from "@/server/renderer/renderer";
import ImageRenderer from "@/server/renderer/notion/image-renderer";
import ParagraphRenderer from "@/server/renderer/notion/paragraph-renderer";
import CodeRenderer from "@/server/renderer/notion/code-renderer";
import TableRenderer from "@/server/renderer/notion/table-renderer";
import TableRowRenderer from "@/server/renderer/notion/table-row-renderer";
import React from "react";
import QuoteRenderer from "@/server/renderer/notion/quote-renderer";
import ColumnRenderer from "@/server/renderer/notion/column-renderer";
import ColumnListRenderer from "@/server/renderer/notion/column-list-renderer";
import BulletedListRenderer from "@/server/renderer/notion/bulleted-list-renderer";
import Toc from "@/server/renderer/toc";
import numberedListRenderer from "@/server/renderer/notion/numbered-list-renderer";

export class NotionArticleRenderer {

    private readonly rendererMap: Map<string, Renderer>
    private cache: Map<string, CacheObject<Block[]>>
    private tocMap: Map<string, Toc>
    private _count: number = 0

    constructor() {
        this.cache = new Map<string, CacheObject<Block[]>>()
        this.rendererMap = new Map<string, Renderer>()
        this.rendererMap.set('heading_1', new H1Renderer(this))
        this.rendererMap.set('heading_2', new H2Renderer(this))
        this.rendererMap.set('heading_3', new H3Renderer(this))
        this.rendererMap.set('image', new ImageRenderer(this))
        this.rendererMap.set('paragraph', new ParagraphRenderer(this))
        this.rendererMap.set('code', new CodeRenderer(this))
        this.rendererMap.set('table', new TableRenderer(this))
        this.rendererMap.set('table_row', new TableRowRenderer(this))
        this.rendererMap.set('quote', new QuoteRenderer(this))
        this.rendererMap.set('column', new ColumnRenderer(this))
        this.rendererMap.set('column_list', new ColumnListRenderer(this))
        this.rendererMap.set('bulleted_list_item', new BulletedListRenderer(this))
        this.rendererMap.set('numbered_list_item', new numberedListRenderer(this))
        this.tocMap = new Map<string, Toc>()
    }

    initToc(id: string, name: string) {
        const toc = new Toc(id, name, 0)
        toc.append(id, name, 1)
        this.tocMap.set(id, toc)
    }

    async getBlockCache(id: string) {
        const cacheObject = this.cache.get(id)
        // console.log(JSON.stringify(cacheObject))
        if (!cacheObject || !cacheObject.valid || cacheObject.expiredTime < Date.now()) {
            console.log('reload cache')
            const res = await notionService.listPageBlock(id, {cache: "no-cache"})
            const blocks: Block[] = res.data ? res.data.results : res.results

            // const imageBLock = blocks.find((block: Block) => block.type === 'image')

            this.cache.set(id, {
                data: blocks,
                // valid: !imageBLock,
                valid: true,
                expiredTime: Date.now() + 1000 * 60
            })
            return blocks
        }

        console.log('use cache')
        return cacheObject!.data
    }

    async render(id: string, name?: string, root?: boolean): Promise<{
        content: React.JSX.Element[],
        toc: Toc | null
    }> {
        const blocks = await this.getBlockCache(id)

        const elements: React.JSX.Element[] = []
        if (blocks) {
            if (root && name) {
                this.initToc(id, name)
            }

            for (const block of blocks) {
                const renderer = this.rendererMap.get(block.type)
                if (!renderer) {
                    console.error(`Not found renderer for block type: ${block.type}`)
                    continue;
                }

                if (root) {
                    if (block.type === 'heading_1') {
                        this.tocMap.get(id)!.append(block.id, block.heading_1.rich_text[0].plain_text, 1)
                    } else if (block.type === 'heading_2') {
                        this.tocMap.get(id)!.append(block.id, block.heading_2.rich_text[0].plain_text, 2)
                    } else if (block.type === 'heading_3') {
                        this.tocMap.get(id)!.append(block.id, block.heading_3.rich_text[0].plain_text, 3)
                    }
                }

                if (block.type === 'numbered_list_item') {
                    this._count++
                } else {
                    this._count = 0
                }
                elements.push(await renderer?.render(block)!);
            }
        }

        return {content: elements, toc: root ? this.tocMap.get(id)!.arrange() : null};
    }


    get count(): number {
        return this._count;
    }
}

const notionArticleRenderer: NotionArticleRenderer = new NotionArticleRenderer()
export default notionArticleRenderer
