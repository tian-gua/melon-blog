import productNotionService from "@/server/service/prod-notion-service";
import devNotionService from "@/server/service/dev-notion-service";

class NotionService {

    getDatabase() {
        const notionServiceImpl: INotionService = process.env.NODE_ENV === 'development' ? devNotionService : productNotionService
        return notionServiceImpl.getDatabase()
    }

    listPageBlock(id: string, options?: RenderOptions) {
        const notionServiceImpl: INotionService = process.env.NODE_ENV === 'development' ? devNotionService : productNotionService
        return notionServiceImpl.listPageBlock(id, options)
    }
}

const notionService: NotionService = new NotionService()

export default notionService
