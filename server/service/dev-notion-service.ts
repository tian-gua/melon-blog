import axios from "axios";

class DevNotionService implements INotionService {
    private readonly authorization: string
    private readonly notionVersion: string
    private readonly databaseId: string
    private readonly proxy: { protocol: string; host: string; port: number }

    constructor() {
        this.databaseId = process.env.DATABASE_ID as string
        this.authorization = process.env.NOTION_AUTH as string
        this.notionVersion = process.env.NOTION_VERSION as string
        this.proxy = {
            protocol: 'http',
            host: '127.0.0.1',
            port: 7897,
        }
    }


    async getDatabase() {
        return axios.post(`https://api.notion.com/v1/databases/${this.databaseId}/query`, {}, {
            proxy: this.proxy,
            headers: {
                'Authorization': this.authorization,
                'Notion-Version': this.notionVersion
            }
        })
    }

    async listPageBlock(pageId: string) {
        return axios.get(`https://api.notion.com/v1/blocks/${pageId}/children`, {
            proxy: this.proxy,
            headers: {
                'Authorization': this.authorization,
                'Notion-Version': this.notionVersion
            }
        })
    }
}

const devNotionService: DevNotionService = new DevNotionService()

export default devNotionService
