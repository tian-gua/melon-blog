import {NextRequest, NextResponse} from "next/server";
import {saveAccessLog} from "@/server/dao/mongo";
import dayjs from "dayjs"

export async function GET(request: NextRequest, context: { params: any }) {
    const pageId = context.params.page_id
    const ip = request.ip ? request.ip : request.headers.get('X-Forwarded-For')
    await saveAccessLog({
        page_id: pageId,
        date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        ip: ip!,
        city: request.geo?.city,
        country: request.geo?.country,
        region: request.geo?.region,
        latitude: request.geo?.latitude,
        longitude: request.geo?.longitude
    });

    return NextResponse.json("ok")
}
