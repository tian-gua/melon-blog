class BaseRenderer {

    processAnnotation(annotations: any) {
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
