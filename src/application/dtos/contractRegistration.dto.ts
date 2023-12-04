import { z } from 'zod';

//   RECORRENTE
const tipo_recorrente = z
  .object({
    inicio_vigencia: z.string(),
    termino_vigencia: z.string(),
    periodicidade: z.string(),
    valor_do_periodo: z.string(),
    observacoes_adicionais: z.string(),
  })
  .optional();

//   AVULSO
const tipo_avulso = z
  .object({
    valor_total_servicos: z.string(),
    numero_parcelas: z.string(),
    data_vencimento: z.string(),
    observacoes_adicionais_nota_fiscal: z.string(),
  })
  .optional();

//
export const ContractRegistrationDto = z.object({
  cliente_novo: z.boolean(),
  cnpj_cliente: z.string(),
  razao_social: z.string().optional(),
  nome_fantasia: z.string().optional(),
  nome_contato: z.string().optional(),
  email_contato: z.string().optional(),
  servicos_prestados: z.array(z.string()),
  emissao_de_nota: z.string(),
  retencao_iss_emissao_nota_fiscal: z.string(),
  forma_recebimento: z.string(),
  tipo: z.string(),

  //   RECORRENTE
  recorrente: tipo_recorrente,
  //   AVULSO
  avulso: tipo_avulso,
});
