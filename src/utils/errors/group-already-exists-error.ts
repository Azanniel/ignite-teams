export class GroupAlreadyExistsError extends Error {
  constructor() {
    super('Já existe um grupo cadastrado com esse nome.')
  }
}
