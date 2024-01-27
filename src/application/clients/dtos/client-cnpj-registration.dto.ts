import { z } from 'zod';

// INFO BASICA
const BasicInfoSchema = z.object({
  razao_social: z.string(),
  nome_cliente: z.string(),
  site: z.string(),
  cnpj_cpf: z.string(),
  insc_estadual: z.string(),
  email: z.string(),
});

//   INFO ATENDIMENTO
const ContactInfoSchema = z.object({
  endereco_atendimento: z.string(),
  bairro: z.string(),
  cep: z.string(),
  cidade: z.string(),
  estado: z.string(),
  ddd: z.string(),
  fax: z.string(),
  telefone: z.string(),
});

//   INFO FATURAMENTO
const BillingInfoSchema = z.object({
  endereco_faturamento: z.string(),
  bairro_faturamento: z.string(),
  cep_faturamento: z.string(),
  cidade_faturamento: z.string(),
  estado_faturamento: z.string(),
  ddd_faturamento: z.string(),
  fax_faturamento: z.string(),
  telefone_faturamento: z.string(),

  emissao_nota: z.string(),
  retencao_iss: z.string(),
  forma_recebimento: z.string(),

  // INFO BOLETOS E NOTAS FISCAIS
  email_boleto_notas: z.string(),
});

//   RESPONSAVEL FINANCEIRO
const FinancialResponsibleSchema = z.object({
  responsavel_financeiro: z.string(),
  ddd_financeiro: z.string(),
  telefone_financeiro: z.string(),
  email_financeiro: z.string(),
});

// REPRESENTANTE LEGAL (Obrigatorio)
const LegalRepresentativeSchema = z.object({
  // REPRESENTANTE LEGAL (Obrigatorio)
  nome_representante: z.string(),
  estado_civil_representante: z.string(),
  profissao_representante: z.string(),
  rg_representante: z.string(),
  cpf_representante: z.string(),
  email_representante: z.string(),
  telefone_representante: z.string(),
  nascimento_representante: z.string(),
});

// TESTEMUNHA / SEGUNDO CONTATO
const AdditionalContactsSchema = z.object({
  nome_segundo_contato: z.string(),
  estado_civil_segundo_contato: z.string(),
  profissao_segundo_contato: z.string(),
  rg_segundo_contato: z.string(),
  cpf_segundo_contato: z.string(),
  email_segundo_contato: z.string(),
  telefone_segundo_contato: z.string(),
  nascimento_segundo_contato: z.string(),

  //   TERCEIRO CONTATO
  nome_terceiro_contato: z.string(),
  estado_civil_terceiro_contato: z.string(),
  profissao_terceiro_contato: z.string(),
  rg_terceiro_contato: z.string(),
  cpf_terceiro_contato: z.string(),
  email_terceiro_contato: z.string(),
  telefone_terceiro_contato: z.string(),
  nascimento_terceiro_contato: z.string(),
});

// REGISTRATION SCHEMA
export const ClientCnpjRegistrationDto = z
  .object({
    basicInfo: BasicInfoSchema,
    contactInfo: ContactInfoSchema,
    billingInfo: BillingInfoSchema,
    finacialInfo: FinancialResponsibleSchema,
    legalInfo: LegalRepresentativeSchema,
    AdditionalContactsSchema: AdditionalContactsSchema,
  })
  .required();
