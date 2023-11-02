import axios from 'axios'
import {RenderOptions} from "@/types/type";

export async function getDatabaseData() {
    if (process.env.APP_ENV === 'dev') {
        return axios.post('https://api.notion.com/v1/databases/' + process.env.DATABASE_ID + '/query', {}, {
            proxy: {
                protocol: 'http',
                host: '127.0.0.1',
                port: 7890,
            },
            headers: {
                'Authorization': process.env.NOTION_AUTH as string,
                'Notion-Version': process.env.NOTION_VERSION as string
            }
        })
    }

    const res = await fetch('https://api.notion.com/v1/databases/' + process.env.DATABASE_ID + '/query', {
        next: {
            revalidate: 60
        },
        method: 'POST',
        headers: {
            'Authorization': process.env.NOTION_AUTH as string,
            'Notion-Version': '2022-06-28'
        }
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export async function listPageBlock(id: string, options?: RenderOptions) {
    if (process.env.APP_ENV === 'dev') {
        return axios.get(`https://api.notion.com/v1/blocks/${id}/children`, {
            proxy: {
                protocol: 'http',
                host: '127.0.0.1',
                port: 7890,
            },
            headers: {
                'Authorization': process.env.NOTION_AUTH as string,
                'Notion-Version': process.env.NOTION_VERSION as string
            }
        })
    }

    const res = await fetch(`https://api.notion.com/v1/blocks/${id}/children`, {
        next: options && options.cache === 'default' ? {
            revalidate: 60
        } : undefined,
        cache: options && options.cache !== 'default' ? options.cache as RequestCache : undefined,
        method: 'GET',
        headers: {
            'Authorization': process.env.NOTION_AUTH as string,
            'Notion-Version': process.env.NOTION_VERSION as string
        }
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
