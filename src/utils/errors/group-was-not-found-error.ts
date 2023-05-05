export class GroupWasNotFondError extends Error {
  constructor() {
    super('O grupo não foi encontrado.')
  }
}
