import {NotionArticleRenderer} from "@/server/renderer/notion-article-renderer";

export class RenderContext {
    private _renderIndex: number = 0
    private _numberListCount: number = 0
    private readonly _blocks: Block[] = []
    private readonly _renderer: NotionArticleRenderer

    constructor(renderer: NotionArticleRenderer, blocks: Block[]) {
        this._blocks = blocks
        this._renderer = renderer
    }

    nextBlock(): Block | undefined {
        if (this._blocks.length > this._renderIndex + 1) {
            return this._blocks[this._renderIndex + 1]
        }
        return undefined
    }

    get renderer(): NotionArticleRenderer {
        return this._renderer
    }

    get numberListCount(): number {
        return this.numberListCount
    }

    increaseNumberListCount() {
        this._numberListCount++
    }

    clearNumberListCount() {
        this._numberListCount = 0
    }

    setRenderIndex(index: number) {
        this._renderIndex = index
    }
}
