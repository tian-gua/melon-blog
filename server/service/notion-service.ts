import productNotionService from "@/server/service/prod-notion-service";
import devNotionService from "@/server/service/dev-notion-service";

class NotionService {
    private database: any
    private lastUpdated: number = 0

    async getDatabase() {
        if (this.lastUpdated + 60 * 1000 > Date.now() && this.database) {
            return this.database
        }

        const notionServiceImpl: INotionService = process.env.NODE_ENV === 'development' ? devNotionService : productNotionService
        this.database = await notionServiceImpl.getDatabase()
        this.lastUpdated = Date.now()
    }

    listPageBlock(id: string, options?: RenderOptions) {
        const notionServiceImpl: INotionService = process.env.NODE_ENV === 'development' ? devNotionService : productNotionService
        return notionServiceImpl.listPageBlock(id, options)
    }
}

const notionService: NotionService = new NotionService()

export default notionService
