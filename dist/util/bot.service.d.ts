export declare class BotTemplateBuilder {
    private lines;
    add(line?: string): this;
    addIf(condition: boolean, line: string): this;
    build(): string;
}
