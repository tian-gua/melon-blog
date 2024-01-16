class ProdNotionService implements INotionService {
    private readonly authorization: string
    private readonly notionVersion: string
    private readonly databaseId: string

    constructor() {
        this.databaseId = process.env.DATABASE_ID as string
        this.authorization = process.env.NOTION_AUTH as string
        this.notionVersion = process.env.NOTION_VERSION as string
    }

    async getDatabase() {
        const res = await fetch(`https://api.notion.com/v1/databases/${this.databaseId}/query`, {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Authorization': this.authorization,
                'Notion-Version': this.notionVersion
            }
        })
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        return res.json()
    }

    async listPageBlock(pageId: string, options?: RenderOptions) {
        const res = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
            next: options && options.cache === 'default' ? {
                revalidate: 60
            } : undefined,
            cache: options && options.cache !== 'default' ? options.cache as RequestCache : undefined,
            method: 'GET',
            headers: {
                'Authorization': this.authorization,
                'Notion-Version': this.notionVersion
            }
        })
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        return res.json()
    }
}

const productNotionService: ProdNotionService = new ProdNotionService()

export default productNotionService
