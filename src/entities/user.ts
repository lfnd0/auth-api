export interface User {
  id?: string
  name: string
  email: string
  cpfCnpj: string
  password: string
  createdAt?: Date
  updateAt?: Date | null
}
