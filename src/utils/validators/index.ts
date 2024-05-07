import { cnpj, cpf } from 'cpf-cnpj-validator'

export function isValidCpfCnpj(cpfCnpj: string) {
  return cpf.isValid(cpfCnpj) || cnpj.isValid(cpfCnpj)
}
