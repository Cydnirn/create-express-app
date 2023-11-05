export default class Controller implements basicController {
    public generateText(text: string): string {
        return `Hello ${text}`;
    }
}
