export interface IIdGeneratorAdapter {
  execute(): Promise<string>;
}
