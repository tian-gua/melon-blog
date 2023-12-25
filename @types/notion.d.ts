declare type NotionData = {
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

declare type Properties = {
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

declare type Blog = {
    id: string
    title: string
    date: string
    type: string
    category: string
    tags: string[]
    status: string | undefined
}

declare type RichText = {
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

declare type Block = {
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


declare type Code = {
    caption: [],
    language: string,
    rich_text: RichText[],
}

declare type Image = {
    caption: any[],
    type: string,
    file: {
        url: string
        expiry_time: string
    }
}

declare type Paragraph = {
    rich_text: RichText[],
    color: string,
}

declare type Table = {
    table_width: number,
    has_row_header: boolean,
    has_column_header: boolean,
}

declare type TableRow = {
    cells: RichText[][]
}

declare type ColumnList = {}

declare type Column = {}


declare type RenderOptions = {
    checkExpired?: boolean
    cache: string
}

declare type CacheObject<T> = {
    data: T
    valid: boolean
    expiredTime: number
}
