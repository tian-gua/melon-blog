import {testConnection} from "@/server/dao/mongo";

export async function register() {
    console.log("启动完成")
    console.log(process.env["MONGO_URI"])
    await testConnection()
}
