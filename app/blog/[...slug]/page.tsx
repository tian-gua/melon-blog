import React from "react"
import Link from "next/link";
import 'highlight.js/styles/github-dark.css';
import hljs from 'highlight.js';
import notionService from "@/server/service/notion-service";

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
        const style: { [key: string]: string } = {}
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
        if (richText.annotations.color !== 'default') {
            style.color = richText.annotations.color
        }
        if (richText.annotations.code) {
            className += " bg-[#e1e2e6] border border-[#c4c8d1] py-[2px] px-1 rounded text-[0.9em] text-black"
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

            richTextDom.push(<span key={index} className={className} style={style}>{richText.plain_text}</span>)
            index++
        }
    }
    return richTextDom
}

const renderQuote = async (block: Block) => {
    // console.log(`quote: ${JSON.stringify(block)}`)
    if (block.quote.rich_text.length === 0) {
        return <></>
    }

    // const richTextDom = []
    // let index = 0
    // for (const richText of block.quote.rich_text) {
    //     richTextDom.push(<span className="inline-block" key={index}>{richText.plain_text}</span>)
    //     index++
    // }

    const richTextDom = await renderRichText(block.quote.rich_text, block)

    if (block.has_children) {
        const res = await notionService.listPageBlock(block.id);
        const subBlocks: Block[] = res.data ? res.data.results : res.results
        console.log(`sub quotes: ${JSON.stringify(subBlocks)}`)
        let index = 0;
        for (const subBlock of subBlocks) {
            for (const richText of subBlock.paragraph.rich_text) {
                richTextDom.push(<span className="inline-block" key={index}>{richText.plain_text}</span>)
                index++
            }
        }
    }

    return <blockquote
        className="p-4 my-4 border-l-4 border-gray-700 bg-gray-200 dark:border-gray-500 dark:bg-gray-800">
        <p className="text-[0.9em] leading-relaxed text-gray-900 dark:text-white">{richTextDom}</p>
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
        hlDom.push(<pre key={i}><code className="" dangerouslySetInnerHTML={{__html: line}}/></pre>)
        i++
    })

    return <div key={block.id} className="w-full mockup-code mb-5 text-[0.9em] font-mono">{hlDom}</div>
}

const renderImage = async (block: Block, options?: RenderOptions) => {
    // console.log(block, options)
    const now = new Date();
    if (options && options.checkExpired && new Date(block.image.file.expiry_time).getTime() <= now.getTime()) {
        throw new Error('image expired');
    }
    const style: { [key: string]: string } = {}
    if (block.image.caption.length > 0) {
        if (block.image.caption[0].plain_text.includes('[') && block.image.caption[0].plain_text.includes(']') && block.image.caption[0].plain_text.includes('x')) {
            style.width = block.image.caption[0].plain_text.split('[')[1].split(']')[0].split('x')[0] + 'px'
            style.height = block.image.caption[0].plain_text.split('[')[1].split(']')[0].split('x')[1] + 'px'
        }
    }
    const className = `mt-5 mb-5 rounded-lg max-w-full shadow-gray-300 shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px]`
    return <img width={style.width} height={style.height} key={block.id} src={block.image.file.url} className={className} alt="image"/>
}

const renderTable = async (block: Block) => {
    if (!block || !block.has_children) {
        return <></>
    }
    const res = await notionService.listPageBlock(block.id);
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
    const res = await notionService.listPageBlock(block.id)
    const blocks: Block[] = res.data ? res.data.results : res.results
    const domList: any = []
    for (const block of blocks) {
        domList.push(await renderer[block.type](block))
    }
    return <div key={block.id} className="w-full h-auto flex gap-20 mt-10">{domList}</div>
}

const renderColumn = async (block: Block) => {
    const res = await notionService.listPageBlock(block.id)
    const blocks: Block[] = res.data ? res.data.results : res.results
    const domList: any = []
    for (const block of blocks) {
        domList.push(await renderer[block.type](block))
    }
    return <div key={block.id} className="w-max h-auto">{domList}</div>
}

const renderer: { [key: string]: RenderFunc } = {
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
    const res = await notionService.listPageBlock(params.slug[0], options)
    const blocks: Block[] = res.data ? res.data.results : res.results
    console.log(`blocks: ${params.slug[0]}`)

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
                domList.push(<ul className="list-disc list-inside mb-4 text-[0.9em] text-gray-700">{tmp_list_disc}</ul>)
                tmp_list_disc = []
            }
            if (tmp_list_decimal.length !== 0) {
                domList.push(<ol
                    className="list-decimal list-inside mb-4 text-[0.9em] text-gray-700">{tmp_list_decimal}</ol>)
                tmp_list_decimal = []
            }
            if (rendererFunc) {
                domList.push(await rendererFunc(block, options))
            } else {
                domList.push(await renderParagraph(block))
            }
        }
        if (tmp_list_disc.length !== 0) {
            domList.push(<ul className="list-disc list-inside mb-4">{tmp_list_disc}</ul>)
        }
        if (tmp_list_decimal.length !== 0) {
            domList.push(<ol className="list-decimal list-inside mb-4">{tmp_list_decimal}</ol>)
        }
    }

    return <div className="font-mono mb-10">
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
        domList = await renderNotionPage({params}, {checkExpired: true, cache: 'default'})
    } catch (error) {
        console.log(error)
        domList = await renderNotionPage({params}, {checkExpired: false, cache: 'no-cache',})
    }

    return domList
}
