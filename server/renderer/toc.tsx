class Toc {
    title: string
    id: string
    level: number
    children: Toc[]

    constructor(id: string, title: string, level: number) {
        this.id = id
        this.title = title
        this.level = level
        this.children = []
    }

    append(id: string, title: string, level: number) {
        this.children.push(new Toc(id, title, level))
    }
}

export default Toc
