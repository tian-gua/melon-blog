export default class BrowserUtils {
    static isMobile(userAgent: string): boolean {
        return /Mobi|Android|iPhone/i.test(userAgent);
    }
}
