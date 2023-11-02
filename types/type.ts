export type NotionData = {
    object: string,
    id: string,
    created_time: string,
    last_edited_time: string,
    cover: any,
    icon: any,
    parent: any,
    archived: boolean,
    properties: Properties,
    url: string,
    public_url: string
}

export type Properties = {
    Date: {
        id: string,
        type: string,
        date: {
            start: string
            end: string
            time_zone: string
            type: string
        }
    },
    Type: {
        id: string,
        type: string,
        select: {
            id: string,
            name: string,
            color: string
        }
    },
    Category: {
        id: string,
        type: string,
        select: {
            id: string,
            name: string,
            color: string
        }
    },
    Tags: {
        id: string,
        type: string,
        multi_select: [
            {
                id: string,
                name: string,
                color: string
            }
        ]
    },
    Title: {
        id: string,
        type: string,
        title: [
            {
                type: string,
                plain_text: string,
                href: string
            }
        ]
    },
    Status: any
}

export type Blog = {
    id: string
    title: string
    date: string
    type: string
    category: string
    tags: string[]
    Status: string
}

export type RichText = {
    type: string,
    text: {
        content: string
        link: {
            url: string
        }
    },
    annotations: {
        bold: boolean
        italic: boolean
        strikethrough: boolean
        underline: boolean
        code: boolean
        color: string
    },
    plain_text: string
    href: string
    [key: string]: any
}

export type Block = {
    object: string,
    id: string,
    created_time: string,
    last_edited_time: string,
    has_children: boolean,
    archived: boolean,
    type: string,
    heading_1: Paragraph,
    heading_2: Paragraph,
    heading_3: Paragraph,
    paragraph: Paragraph,
    bulleted_list_item: Paragraph,
    quote: Paragraph,
    image: Image,
    code: Code,
    table: Table,
    table_row: TableRow,
    column_list: ColumnList,
    column: Column,
    [key: string]: any
}


export type Code = {
    caption: [],
    language: string,
    rich_text: RichText[],
}

export type Image = {
    caption: any[],
    type: string,
    file: {
        url: string
        expiry_time: string
    }
}

export type Paragraph = {
    rich_text: RichText[],
    color: string,
}

export type Table = {
    table_width: number,
    has_row_header: boolean,
    has_column_header: boolean,
}

export type TableRow = {
    cells: RichText[][]
}

export type ColumnList = {

}

export type Column = {

}


export type RenderOptions = {
    checkExpired?: boolean
    cache: string
}

export type RenderFunc = (block: Block, option?: RenderOptions) => any
