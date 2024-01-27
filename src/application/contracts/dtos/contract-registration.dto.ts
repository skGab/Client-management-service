import { z } from 'zod';

//   RECORRENTE
const tipo_recorrente = z
  .object({
    inicio_vigencia: z.string(),
    termino_vigencia: z.string(),
    // periodicidade: z.string(),
    valor_total: z.string(),
    data_vencimento: z.string(),
    observacoes_adicionais: z.string(),
    servicos_prestados: z.array(z.string()),
  })
  .optional()
  .nullable();

//   AVULSO
const tipo_avulso = z
  .object({
    inicio_vigencia: z.string(),
    termino_vigencia: z.string(),
    valor_total_servicos: z.string(),
    numero_parcelas: z.string(),
    data_vencimento: z.string(),
    observacoes_adicionais_nota_fiscal: z.string(),
    servicos_prestados: z.array(z.string()),
  })
  .optional()
  .nullable();

//
export const ContractRegistrationDto = z.object({
  // cliente_novo: z.boolean(),
  cnpj_cpf: z.string(),
  // razao_social: z.string().optional(),
  // nome_fantasia: z.string().optional(),
  // nome_contato: z.string().optional(),
  // email_contato: z.string().optional(),

  // emissao_de_nota: z.string(),
  // retencao_iss_emissao_nota_fiscal: z.string(),
  // forma_recebimento: z.string(),
  tipo: z.string(),

  //   RECORRENTE
  recorrente: tipo_recorrente,
  //   AVULSO
  avulso: tipo_avulso,
});
