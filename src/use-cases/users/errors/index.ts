export class UserAlreadyExistsError extends Error {
  constructor() {
    super('E-mail, CPF or CNPJ already exists')
  }
}
