import mongoose, {Schema} from "mongoose";

// 连接mongodb数据库
export const connection = async () => {
    const url = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`
    console.log('url: ', url);
    return mongoose.connect(url, {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PWD,
        dbName: process.env.MONGO_SCHEMA,
    });
}

// 断开连接
export const disconnect = async () => mongoose.disconnect();

// 测试连接
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
