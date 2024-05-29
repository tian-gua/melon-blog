import productNotionService from "@/server/service/prod-notion-service";
import devNotionService from "@/server/service/dev-notion-service";

class NotionService {
    private blogs: Blog[] = []
    private categoryBlogs = new Map<string, Blog[]>()
    private tags = new Map<string, string[]>()
    private categories: string[] = []
    private lastUpdated: number = 0

    async fetchBLogList() {
        const notionServiceImpl: INotionService = process.env.NODE_ENV === 'development' ? devNotionService : productNotionService
        const database = await notionServiceImpl.getDatabase()
        this.lastUpdated = Date.now()

        const results: NotionData[] = database.data ? database.data.results : database.results

        const blogs: Blog[] = []
        for (let result of results) {
            // console.log(JSON.stringify(result.properties))

            const properties: Properties = result.properties
            const tags: string[] = properties.Tags.multi_select.map((tag: any) => tag.name)
            const blog: Blog = {
                id: result.id,
                title: properties.Title.title.map((text: any) => text.plain_text).join(''),
                date: properties.Date.date.start,
                type: properties.Type.select.name,
                category: properties.Category.select?.name,
                tags: tags,
                status: properties.Status ? properties.Status.select.name : undefined,
                isNew: Date.now() - new Date(properties.Date.date.start).getTime() < 7 * 24 * 60 * 60 * 1000
            }
            if (blog.status !== 'Published') {
                continue
            }
            blogs.push(blog)
        }

        this.blogs = blogs.sort((a, b) => {
            return b.date.localeCompare(a.date)
        })

        this.categoryBlogs.clear()
        this.tags.clear()
        this.blogs.forEach((blog) => {
            if (blog.type !== '文章') {
                return
            }
            if (blog.category && this.categories.indexOf(blog.category) === -1) {
                this.categories.push(blog.category)
            }
            if (this.categoryBlogs.get(blog.category)) {
                this.categoryBlogs.get(blog.category)!.push(blog)
            } else {
                this.categoryBlogs.set(blog.category, [blog])
            }

            blog.tags.forEach((tag) => {
                if (this.tags.get(blog.id)) {
                    this.tags.get(blog.id)!.push(tag)
                } else {
                    this.tags.set(blog.id, [tag])
                }
            })
        })

        this.categories.sort((a, b) => {
            return a.localeCompare(b)
        })
        // console.log(`blogs: ${JSON.stringify(this.blogs)}`)
    }

    async getCategoryBlogs(category: string) {
        console.log(`lastUpdated: ${this.lastUpdated}, now: ${Date.now()}, diff: ${this.lastUpdated + 60 * 1000 - Date.now()}`)
        if (this.lastUpdated + 60 * 1000 > Date.now() && this.categoryBlogs.has(category)) {
            return this.categoryBlogs.get(category)
        }

        await this.fetchBLogList()
        return this.categoryBlogs.get(category)
    }

    async getCategories(): Promise<string[]> {
        console.log(`lastUpdated: ${this.lastUpdated}, now: ${Date.now()}, diff: ${this.lastUpdated + 60 * 1000 - Date.now()}`)
        if (this.lastUpdated + 60 * 1000 > Date.now() && this.categories) {
            return this.categories
        }

        await this.fetchBLogList()
        return this.categories
    }

    async getBlogTags() {
        return this.tags
    }

    async getBlog(id: string) {
        console.log(`lastUpdated: ${this.lastUpdated}, now: ${Date.now()}, diff: ${this.lastUpdated + 60 * 1000 - Date.now()}`)
        if (this.lastUpdated + 60 * 1000 > Date.now() && this.blogs) {
            return this.blogs.find((blog) => blog.id === id)
        }

        await this.fetchBLogList()
        return this.blogs.find((blog) => blog.id === id)
    }


    listPageBlock(id: string, options?: RenderOptions) {
        const notionServiceImpl: INotionService = process.env.NODE_ENV === 'development' ? devNotionService : productNotionService
        return notionServiceImpl.listPageBlock(id, options)
    }
}

const notionService: NotionService = new NotionService()

export default notionService
