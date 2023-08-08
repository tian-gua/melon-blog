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
    Category: any,
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
    heading_1: {
        rich_text: RichText[],
        color: string,
    },
    heading_2: {
        rich_text: RichText[],
        color: string,
    },
    heading_3: {
        rich_text: RichText[],
        color: string,
    },
    paragraph: {
        rich_text: RichText[],
        color: string,
    },
    bulleted_list_item: {
        rich_text: RichText[],
        color: string,
    },
    quote: {
        rich_text: RichText[],
        color: string,
    },
    image: {
        caption: [],
        type: string,
        file: {
            url: string
            expiry_time: string
        }
    },
    [key: string]: any
}
