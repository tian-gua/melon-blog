import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest, context: { params: any }) {
    console.log(request)
    const blog = context.params.blog
    return NextResponse.json({blog, ip: request.ip ? request.ip : request.headers.get('X-Forwarded-For'), geo: request.geo})
}
