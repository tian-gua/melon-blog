import React from "react"
import {listPageBlock} from "@/api/notion";
import {Block, RichText} from "@/types/type";
import Link from "next/link";
import 'highlight.js/styles/github-dark.css';
import hljs from 'highlight.js';

type RenderOptions = {
    checkExpired?: boolean
}

type renderFunc = (block: Block, option?: RenderOptions) => any

const renderParagraph = async (block: Block) => {
    if (!block || !block[block.type].rich_text) {
        return <></>
    }
    const richTextDom = await renderRichText(block[block.type].rich_text, block)
    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
        return <li key={block.id}>{richTextDom}</li>
    } else if (block.type === 'heading_1' || block.type === 'heading_2' || block.type === 'heading_3') {
        return <span key={block.id}>{richTextDom}</span>
    } else {
        return <p key={block.id} className="mb-2">{richTextDom}</p>
    }
}

const renderRichText = async (richTexts: RichText[], block: Block) => {
    const richTextDom = []
    let index = 0
    for (const richText of richTexts) {
        let className = "w-full"
        if (richText.annotations.bold) {
            className += " font-bold"
        }
        if (richText.annotations.italic) {
            className += " italic"
        }
        if (richText.annotations.strikethrough) {
            className += " line-through"
        }
        if (richText.annotations.underline) {
            className += " underline"
        }
        if (richText.annotations.code) {
            className += " bg-gray-600 p-1 rounded-md text-slate-100 text-[0.8em] font-bold"
        }
        if (richText.text.link && richText.text.link.url) {
            className += " hover:underline cursor-pointer text-blue-700"
            richTextDom.push(<Link key={index} className={className}
                                   href={richText.text.link.url}>{richText.plain_text}</Link>)
        } else {
            if (block.type === 'heading_1') {
                className += " text-[1.5em] font-bold block mt-10 mb-2"
            } else if (block.type === 'heading_2') {
                className += " text-[1.3em] font-bold block mt-10 mb-2"
            } else if (block.type === 'heading_3') {
                className += " text-[1.1em] font-bold block mt-5 mb-2"
            }

            richTextDom.push(<span key={index} className={className}>{richText.plain_text}</span>)
            index++
        }
    }
    return richTextDom
}

const renderQuote = async (block: Block) => {
    if (block.paragraph.rich_text.length === 0) {
        return <></>
    }
    const richTextDom = []
    let index = 0
    for (const richText of block.paragraph.rich_text) {
        richTextDom.push(<span key={index}>{richText.plain_text}</span>)
        index++
    }
    return <blockquote className="p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
        <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">{richTextDom}</p>
    </blockquote>
}

const renderCode = async (block: Block) => {
    if (block.code.rich_text.length === 0) {
        return <></>
    }

    const hlDom: any = []
    let code = ''
    for (const richText of block.code.rich_text) {
        code += richText.plain_text
    }
    let language = block.code.language;
    if (block.code.language === 'plain text') {
        language = 'plaintext'
    }
    const hlCode = hljs.highlight(code, {language: language}).value
    let i = 0
    hlCode.split('\n').forEach((line) => {
        hlDom.push(<pre key={i}><code dangerouslySetInnerHTML={{__html: line}}/></pre>)
        i++
    })
    return <div key={block.id} className="w-full mockup-code mb-5 text-[0.9em] font-mono">{hlDom}</div>
}

const renderImage = async (block: Block, options?: RenderOptions) => {
    console.log(block, options)
    const now = new Date();
    if (options && options.checkExpired && new Date(block.image.file.expiry_time).getTime() <= now.getTime()) {
        throw new Error('image expired');
    }
    let width = 'w-auto'
    let height = 'h-auto'
    if (block.image.caption.length > 0) {
        if (block.image.caption[0].plain_text.includes('[200x200]')) {
            width = `w-[200px]`
            height = `h-[200px]`
        } else if (block.image.caption[0].plain_text.includes('[400x400]')) {
            width = `w-[400px]`
            height = `h-[400px]`
        } else if (block.image.caption[0].plain_text.includes('[800x800]')) {
            width = `w-[800px]`
            height = `h-[800px]`
        } else if (block.image.caption[0].plain_text.includes('[800x600]')) {
            width = `w-[800px]`
            height = `h-[600px]`
        }
    }
    const style = `mt-5 mb-5 rounded-lg ${width} ${height} max-w-full shadow-lg shadow-gray-300 border border-gray-200`
    return <img key={block.id} src={block.image.file.url} className={style} alt="image"/>
}

const renderTable = async (block: Block) => {
    if (!block || !block.has_children) {
        return <></>
    }
    const res = await listPageBlock(block.id);
    const blocks: Block[] = res.data ? res.data.results : res.results
    const domList: any = []
    for (const block of blocks) {
        domList.push(await renderer[block.type](block))
    }
    return <div className="overflow-x-auto">
        <table className="table">
            <tbody>{domList}</tbody>
        </table>
    </div>
}

const renderTableRow = async (block: Block) => {
    if (!block || !block.table_row || !block.table_row.cells) {
        return <></>
    }
    const cells = block.table_row.cells
    const domList: any = []
    let index = 0
    for (const cell of cells) {
        domList.push(<td key={index}
                         className="border border-gray-300 px-4 py-2">{await renderRichText(cell, block)}</td>)
        index++
    }
    return <tr key={block.id}>{domList}</tr>
}

const renderColumnList = async (block: Block) => {
    const res = await listPageBlock(block.id)
    const blocks: Block[] = res.data ? res.data.results : res.results
    const domList: any = []
    for (const block of blocks) {
        domList.push(await renderer[block.type](block))
    }
    return <div key={block.id} className="w-full h-auto flex gap-20 mt-10">{domList}</div>
}

const renderColumn = async (block: Block) => {
    const res = await listPageBlock(block.id)
    const blocks: Block[] = res.data ? res.data.results : res.results
    const domList: any = []
    for (const block of blocks) {
        domList.push(await renderer[block.type](block))
    }
    return <div key={block.id} className="w-max h-auto">{domList}</div>
}

const renderer: { [key: string]: renderFunc } = {
    'heading_1': renderParagraph,
    'heading_2': renderParagraph,
    'heading_3': renderParagraph,
    'paragraph': renderParagraph,
    'bulleted_list_item': renderParagraph,
    'numbered_list_item': renderParagraph,
    'quote': renderQuote,
    'image': renderImage,
    'code': renderCode,
    'table': renderTable,
    'table_row': renderTableRow,
    'column_list': renderColumnList,
    'column': renderColumn,
    'text': renderParagraph,
}

const renderNotionPage = async ({params}: { params: { slug: string[] } }, options: RenderOptions) => {
    const res = await listPageBlock(params.slug[0])
    const blocks: Block[] = res.data ? res.data.results : res.results
    const domList: any = []

    let tmp_list_disc: any = []
    let tmp_list_decimal: any = []

    if (blocks && blocks.length > 0) {
        for (const block of blocks) {
            const rendererFunc = renderer[block.type]
            if (block.type === 'bulleted_list_item') {
                tmp_list_disc.push(await rendererFunc(block))
                continue
            }
            if (block.type === 'numbered_list_item') {
                tmp_list_decimal.push(await rendererFunc(block))
                continue
            }
            if (tmp_list_disc.length !== 0) {
                domList.push(<ul className="list-disc list-inside">{tmp_list_disc}</ul>)
                tmp_list_disc = []
            }
            if (tmp_list_decimal.length !== 0) {
                domList.push(<ol className="list-decimal list-inside">{tmp_list_decimal}</ol>)
                tmp_list_decimal = []
            }
            if (rendererFunc) {
                domList.push(await rendererFunc(block, options))
            } else {
                domList.push(await renderParagraph(block))
            }
        }
        if (tmp_list_disc.length !== 0) {
            domList.push(<ul className="list-disc list-inside mt-5">{tmp_list_disc}</ul>)
        }
        if (tmp_list_decimal.length !== 0) {
            domList.push(<ol className="list-decimal list-inside mt-5">{tmp_list_decimal}</ol>)
        }
    }

    return <div className="font-mono mb-20">
        <h1 className="w-full mx-auto text-center text-[1.8em]">{decodeURIComponent(params.slug[1])}</h1>
        <div className="divider"></div>
        <div className="text-base antialiased">
            {domList}
        </div>
    </div>
}

export default async function Blog({params}: { params: { slug: string[] } }) {
    let domList = <></>
    try {
        domList = await renderNotionPage({params}, {checkExpired: true})
    } catch (error) {
        console.log(error)
        domList = await renderNotionPage({params}, {checkExpired: false})
    }

    return domList
}
