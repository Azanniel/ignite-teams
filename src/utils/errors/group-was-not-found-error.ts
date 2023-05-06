export class GroupWasNotFoundError extends Error {
  constructor() {
    super('O grupo não foi encontrado.')
  }
}
