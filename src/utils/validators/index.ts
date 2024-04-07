import { cnpj, cpf } from 'cpf-cnpj-validator'

export function isValidCpfCnpj(cpfCnpj: string) {
  const onlyCpfCnpjNumbers = cpfCnpj.replace(/\D/g, '')
  return cpf.isValid(onlyCpfCnpjNumbers) || cnpj.isValid(onlyCpfCnpjNumbers)
}
