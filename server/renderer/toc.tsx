class Toc {
    title: string
    id: string
    level: number
    children: Toc[]
    level2Num: number = 0

    constructor(id: string, title: string, level: number) {
        this.id = id
        this.title = title
        this.level = level
        this.children = []
    }

    append(id: string, title: string, level: number) {
        if (level === 2) {
            this.level2Num++
        }
        this.children.push(new Toc(id, title, level))
    }

    arrange() {
        if (this.level2Num == 0) {
            this.children.forEach((child) => {
                child.level--
            })
        }
        return this
    }
}

export default Toc
