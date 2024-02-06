import React from "react";

declare interface Renderer {
    render(block: Block): Promise<React.JSX.Element>
}
