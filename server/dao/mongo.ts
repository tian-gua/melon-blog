import mongoose, {Schema} from 'mongoose';
import {AccessLogModelSchema} from './schema';
import Access_log from "@/components/access_log";

export const connection = async () => {
    let url = `mongodb://${process.env.MONGO_HOST}:27017`
    console.log('url: ', url);
    return mongoose.connect(url, {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PWD,
        dbName: process.env.MONGO_SCHEMA,
    });
}
export const disconnect = async () => mongoose.disconnect();

export const testConnection = async () => {
    // 防止重复连接
    if (mongoose.connection.readyState === 0) {
        await connection();
    }

    const Test = mongoose.model('test', new Schema({title: String}));
    const query = Test.findOne()
    const test = await query.exec();
    console.log(test);
}

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
