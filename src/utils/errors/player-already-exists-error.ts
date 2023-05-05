export class PlayerAlreadyExistsError extends Error {
  constructor() {
    super('Esse jogador(a) já está adicionada a um time.')
  }
}
