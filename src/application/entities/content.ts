export class Content {
  private readonly content: string;

  public get value(): string {
    return this.content;
  }

  private validateContentLenght(content: string): boolean {
    return content.length >= 5 && content.length <= 255;
  }

  constructor(content: string) {
    const isContentLenghtValid = this.validateContentLenght(content);

    if (!isContentLenghtValid) {
      throw new Error('content length error');
    }

    this.content = content;
  }
}
