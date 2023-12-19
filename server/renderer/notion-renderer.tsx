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

export class NotionRenderer {

    private readonly rendererMap: Map<string, Renderer>
    private blockMap: Map<string, Block[]>
    private delayBlocks: Block[] = []

    constructor() {
        this.blockMap = new Map<string, Block[]>()
        this.rendererMap = new Map<string, Renderer>()
        this.rendererMap.set('heading_1', new H1Renderer())
        this.rendererMap.set('heading_2', new H2Renderer())
        this.rendererMap.set('heading_3', new H3Renderer())
        this.rendererMap.set('image', new ImageRenderer())
        this.rendererMap.set('paragraph', new ParagraphRenderer())
        this.rendererMap.set('code', new CodeRenderer())
        this.rendererMap.set('table', new TableRenderer(this))
        this.rendererMap.set('table_row', new TableRowRenderer())
        this.rendererMap.set('quote', new QuoteRenderer(this))
        this.rendererMap.set('column', new ColumnRenderer(this))
        this.rendererMap.set('column_list', new ColumnListRenderer(this))
        this.rendererMap.set('bulleted_list_item', new BulletedListRenderer())
        this.rendererMap.set('numbered_list_item', new BulletedListRenderer())
    }

    async fetchBlocks(id: string) {
        if (!this.blockMap.has(id)) {
            const res = await notionService.listPageBlock(id, {cache: "reload"})
            this.blockMap.set(id, res.data ? res.data.results : res.results)
        }

        return this.blockMap.get(id)
    }

    async render(id: string) {
        const blocks = await this.fetchBlocks(id)

        const elements: React.JSX.Element[] = []
        if (blocks) {
            for (const block of blocks!) {
                const renderer = this.rendererMap.get(block.type)
                if (!renderer) {
                    console.error(`Not found renderer for block type: ${block.type}`)
                    continue;
                }
                if (renderer.immediate()) {
                    if (this.delayBlocks[0]) {
                        const tmpJsxElements = []
                        for (let delayBlock of this.delayBlocks) {
                            const renderer = this.rendererMap.get(delayBlock.type)
                            tmpJsxElements.push(await renderer?.render(delayBlock)!)
                        }

                        if (this.delayBlocks[0].type === 'bulleted_list_item') {
                            elements.push(<ul
                                className={"list-disc list-inside mb-4 text-[0.9em] text-gray-700"}>{tmpJsxElements}</ul>)
                        } else if (this.delayBlocks[0].type === 'numbered_list_item') {
                            elements.push(<ol
                                className={"list-decimal list-inside mb-4 text-[0.9em] text-gray-700"}>{tmpJsxElements}</ol>)
                        }
                        this.delayBlocks = []
                    }
                    elements.push(await renderer?.render(block)!);
                } else {
                    this.delayBlocks.push(block)
                }
            }
        }
        // console.log(elements)
        return elements
    }
}

const notionRenderer: NotionRenderer = new NotionRenderer()
export default notionRenderer
