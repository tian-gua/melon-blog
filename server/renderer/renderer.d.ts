import React from "react";
import {RenderContext} from "@/server/renderer/context";

declare interface Renderer {
    render(context: RenderContext, block: Block): Promise<React.JSX.Element>
}
