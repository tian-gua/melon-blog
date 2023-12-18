import BaseRenderer from "@/server/renderer/notion/base-renderer";
import {Renderer} from "@/server/renderer/renderer";
import {NotionRenderer} from "@/server/renderer/notion-renderer";
import Link from "next/link";

class TableRowRenderer extends BaseRenderer implements Renderer {
    async render(block: Block) {
        if (!block || !block.table_row || !block.table_row.cells) {
            return <></>
        }
        const cells = block.table_row.cells
        return <tr key={block.id}>{cells.map((cell: RichText[], index: number) => {
            return <td key={index} className="border border-gray-300 px-4 py-2">{this.renderRichText(cell)}</td>
        })}</tr>
    }
}

export default TableRowRenderer
