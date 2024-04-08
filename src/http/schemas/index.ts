import { z } from 'zod'
import { isValidCpfCnpj } from '../../utils/validators'

export const registerBodySchema = z
  .object({
    name: z.string().min(3, 'Invalid name'),
    email: z.string().email('Invalid e-mail'),
    cpfCnpj: z.string().refine((cpfCnpjData) => isValidCpfCnpj(cpfCnpjData), {
      message: 'Invalid cpf or cnpj',
    }),
    password: z.string().min(6, 'Invalid password'),
  })
  .strict()

export const authenticateBodySchema = z
  .object({
    email: z.string().email('Invalid e-mail').optional(),
    cpfCnpj: z.string().optional(),
    password: z.string().min(6, 'Invalid password'),
  })
  .strict()
