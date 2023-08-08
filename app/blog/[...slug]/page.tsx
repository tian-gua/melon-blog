import React from "react"
import {listPageBlock} from "@/api/notion";
import {Block, RichText} from "@/types/type";
import Link from "next/link";

const renderHeading2 = (richTexts: RichText[], color: string) => {
    if (richTexts.length === 0) {
        return <></>
    }
    const richTextDom = []
    for (const richText of richTexts) {
        richTextDom.push(<h2 className="w-full mt-5 mb-2 text-[1.5em] font-bold">{richText.plain_text}</h2>)
    }
    return richTextDom
}

const renderHeading3 = (richTexts: RichText[], color: string) => {
    if (richTexts.length === 0) {
        return <></>
    }
    const richTextDom = []
    for (const richText of richTexts) {
        richTextDom.push(<h3 className="w-full mt-5 mb-2 text-[1.3em] font-bold">{richText.plain_text}</h3>)
    }
    return richTextDom
}

const renderParagraph = (richTexts: RichText[], color: string) => {
    if (richTexts.length === 0) {
        return <></>
    }
    const richTextDom = []
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
        if (richText.text.link && richText.text.link.url) {
            className += " hover:underline cursor-pointer text-blue-700"
            richTextDom.push(<Link className={className} href={richText.text.link.url}>{richText.plain_text}</Link>)
        } else {
            className += ""
            richTextDom.push(<span className={className}>{richText.plain_text}</span>)
        }
    }
    return <p className="mb-2">{richTextDom}</p>
}

const renderCode = (richTexts: RichText[], color: string) => {
    if (richTexts.length === 0) {
        return <></>
    }
    const richTextDom: any = []

    for (const richText of richTexts) {
        let i = 1
        richText.plain_text.split('\n').forEach((line) => {
            richTextDom.push(<pre data-prefix={i}>{line}</pre>)
            i++
        })
    }
    return <div className="w-full mockup-code mt-5">{richTextDom}</div>
}

const renderList = (richTexts: RichText[], color: string) => {
    if (richTexts.length === 0) {
        return <></>
    }
    const richTextDom = []
    for (const richText of richTexts) {
        if (richText.type === 'text' && richText.text.link && richText.text.link.url) {
            richTextDom.push(<Link className="hover:underline text-blue-500"
                                   href={richText.text.link.url}>{richText.plain_text}</Link>)
        } else {
            richTextDom.push(<span>{richText.plain_text}</span>)
        }
    }
    return <li>{richTextDom}</li>
}

const renderQuote = (richTexts: RichText[], color: string) => {
    if (richTexts.length === 0) {
        return <></>
    }
    const richTextDom = []
    for (const richText of richTexts) {
        richTextDom.push(<span>{richText.plain_text}</span>)
    }
    return <blockquote
        className="p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"><p
        className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">{richTextDom}</p>
    </blockquote>
}

const renderImage = (url: string) => {
    return <img src={url} className="w-full m-5 shadow-lg rounded-lg" alt=""/>
}

const renderer: any = {
    'heading_2': renderHeading2,
    'heading_3': renderHeading3,
    'paragraph': renderParagraph,
    'bulleted_list_item': renderList,
    'numbered_list_item': renderList,
    'quote': renderQuote,
    'image': renderImage,
    'code': renderCode,
}


export default async function Blog({params}: { params: { slug: string[] } }) {
    const res = await listPageBlock(params.slug[0])
    const blocks: Block[] = res.data ? res.data.results : res.results
    const domList: any = []

    let tmp_list_disc: any = []
    let tmp_list_decimal: any = []

    if (blocks && blocks.length > 0) {
        for (const block of blocks) {
            const rendererFunc = renderer[block.type]
            if (block.type === 'bulleted_list_item') {
                tmp_list_disc.push(rendererFunc(block[block.type].rich_text, block[block.type].color))
                continue
            }
            if (block.type === 'numbered_list_item') {
                tmp_list_decimal.push(rendererFunc(block[block.type].rich_text, block[block.type].color))
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
            if (block.type === 'image') {
                domList.push(rendererFunc(block[block.type].file.url))
                continue
            }
            if (rendererFunc) {
                domList.push(rendererFunc(block[block.type].rich_text, block[block.type].text_color));
            } else {
                const richText: RichText = block[block.type].rich_text[0];
                if (richText.type === 'text') {
                    domList.push(<div key={block.id} className="w-full border">{richText.plain_text}</div>)
                } else {
                    domList.push(<div key={block.id} className="w-full border text-red-600">{richText.plain_text}</div>)
                }
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
        <h1 className="w-full mx-auto text-center text-[2em]">{decodeURIComponent(params.slug[1])}</h1>
        <div className="divider"></div>
        <div className="text-base antialiased">
            {domList}
        </div>
    </div>
}
