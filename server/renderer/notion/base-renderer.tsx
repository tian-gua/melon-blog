import Link from "next/link";
import notionArticleRenderer, {NotionArticleRenderer} from "@/server/renderer/notion-article-renderer";

class BaseRenderer {

    protected notionArticleRenderer: NotionArticleRenderer

    constructor(notionArticleRenderer: NotionArticleRenderer) {
        this.notionArticleRenderer = notionArticleRenderer;
    }

    protected renderRichText(richTexts: RichText[]) {
        if (richTexts.length === 0) return <br/>
        return richTexts.map((richText, index) => {
            if (richText.text.link && richText.text.link && richText.text.link.url) {
                return <Link key={index} className={"hover:underline cursor-pointer text-blue-700"}
                             href={richText.text.link.url}>{richText.plain_text}</Link>
            }
            const style = this.processAnnotation(richText.annotations)
            return <span key={index} className={""} style={style}>{richText.plain_text}</span>
        })
    }

    protected processAnnotation(annotations: any) {
        const style: any = {}
        if (annotations.bold) {
            style.fontWeight = "bold"
        }
        if (annotations.italic) {
            style.fontStyle = "italic"
        }
        if (annotations.strikethrough) {
            style.textDecoration = "line-through"
        }
        if (annotations.underline) {
            style.textDecoration = "underline"
        }
        if (annotations.color !== 'default') {
            style.color = annotations.color
        }
        if (annotations.code) {
            style.backgroundColor = 'rgb(86 86 86)'
            style.display = "inline-block"
            style.padding = "2px 4px"
            style.color = 'white'
            style.fontSize = "13px"
            style.fontWeight = "900"
            style.borderRadius = "3px"
            style.lineHeight = "1"
            style.margin = "0 2px"
        }
        return style
    }
}

export default BaseRenderer
