export class BotTemplateBuilder {
  private lines: string[] = [];

  add(line: string = ''): this {
    this.lines.push(line);
    return this;
  }

  addIf(condition: boolean, line: string): this {
    if (condition) {
      this.lines.push(line);
    }
    return this;
  }

  build(): string {
    return this.lines.join('');
  }
}
