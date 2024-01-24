import { z } from 'zod';

// REGISTRATION SCHEMA
export const ClientBasicDto = z
  .object({
    nome_cliente: z.string(),
    site: z.string(),
    email: z.string(),
    telefone: z.string(),
  })
  .required();
