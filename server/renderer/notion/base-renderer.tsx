import Link from "next/link";

class BaseRenderer {
    protected renderRichText(richTexts: RichText[]) {
        return richTexts.map((richText, index) => {
            if (richText.text.link && richText.text.link && richText.text.link.url) {
                return <Link key={index} className={"hover:underline cursor-pointer text-blue-700"}
                             href={richText.text.link.url}>{richText.plain_text}</Link>
            }
            const style = this.processAnnotation(richText.annotations)
            return <span key={index} className={"mb-2"} style={style}>{richText.plain_text}</span>
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
            style.backgroundColor = '#e5e7eb'
            style.display = "inline-block"
            style.padding = "2px 4px"
            style.color = "red"
            style.fontSize = "14px"
            style.borderRadius = "6px"
        }
        return style
    }

    immediate(): boolean {
        return true
    }
}

export default BaseRenderer
