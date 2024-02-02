import { z } from 'zod';

// CONTRACT DTO
export const ContractRegistrationDto = z.object({
  // CAMPOS OBRIGATORIOS
  cnpj_cpf: z.string(),
  tipo: z.string(),
  inicio_vigencia: z.string(),
  termino_vigencia: z.string(),
  valor_total: z.string(),
  data_vencimento: z.string(),
  servicos_prestados: z.array(z.string()),
  observacoes_adicionais: z.string(),

  //   RECORRENTE
  periodicidade: z.string().optional().nullable(),

  //   AVULSO
  numero_parcelas: z.string().optional().nullable(),
});
