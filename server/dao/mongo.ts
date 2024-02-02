import mongoose from 'mongoose';
import {AccessLogModelSchema} from './schema';
import {connection} from './connection';

export const saveAccessLog = async (log: {
    page_id: string,
    title?: string,
    date: string,
    ip: string,
    city?: string,
    country?: string,
    region?: string,
    latitude?: string,
    longitude?: string,
}) => {
    // 防止重复连接
    if (mongoose.connection.readyState === 0) {
        await connection();
    }
    const Model = mongoose.model('access_log', AccessLogModelSchema)
    const accessLog = new Model(log);
    await accessLog.save();
}
