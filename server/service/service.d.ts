declare class BaseService {

}

declare interface INotionService {
    // 获取数据库信息
    getDatabase(): Promise<any>;

    // 获取页面信息
    listPageBlock(id: string, options?: RenderOptions): Promise<any>;
}
