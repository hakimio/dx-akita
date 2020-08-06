
export class StringUtils {
    static capitalize(text: string): string {
        return text.replace(/(^.)/, c => c.toUpperCase());
    }
}
