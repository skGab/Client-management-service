import { FormContract } from 'src/domain/entity/client.entity';
import { ZodObject, z } from 'zod';

export class ClientRegistrationDto {
  public id: string;
  public razao_social: string;
  public nome_fantasia: string;
  public site: string;
  public cnpj_cpf: string;
  public insc_estadual: string;
  public email: string;

  //   INFO ATENDIMENTO
  public endereco_atendimento: string;
  public bairro: string;
  public cep: string;
  public cidade: string;
  public estado: string;
  public ddd: string;
  public fax: string;
  public telefone: string;

  //   INFO FATURAMENTO
  public endereco_faturamento: string;
  public bairro_faturamento: string;
  public cep_faturamento: string;
  public cidade_faturamento: string;
  public estado_faturamento: string;
  public ddd_faturamento: string;
  public fax_faturamento: string;
  public telefone_faturamento: string;

  //   RESPONSAVEL FINANCEIRO
  public responsavel_financeiro: string;
  public ddd_financeiro: string;
  public telefone_financeiro: string;
  public email_financeiro: string;

  // REPRESENTANTE LEGAL (Obrigatorio)
  public nome_representante: string;
  public estado_civil_representante: string;
  public profissao_representante: string;
  public rg_representante: string;
  public cpf_representante: string;
  public email_representante: string;
  public telefone_representante: string;
  public nascimento_representante: string;

  // INFO BOLETOS E NOTAS FISCAIS
  public email_boleto_notas: string;

  // TESTEMUNHA / SEGUNDO CONTATO
  public nome_segundo_contato: string;
  public estado_civil_segundo_contato: string;
  public profissao_segundo_contato: string;
  public rg_segundo_contato: string;
  public cpf_segundo_contato: string;
  public email_segundo_contato: string;
  public telefone_segundo_contato: string;
  public nascimento_segundo_contato: string;

  //   TERCEIRO CONTATO
  public nome_terceiro_contato: string;
  public estado_civil_terceiro_contato: string;
  public profissao_terceiro_contato: string;
  public rg_terceiro_contato: string;
  public cpf_terceiro_contato: string;
  public email_terceiro_contato: string;
  public telefone_terceiro_contato: string;
  public nascimento_terceiro_contato: string;
}

// INFO BASICA
const BasicInfoSchema = z.object({
  id: z.string(),
  razao_social: z.string(),
  nome_fantasia: z.string(),
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

// 
export const RegistrationSchema = z
  .object({
    basicInfo: BasicInfoSchema,
    contactInfo: ContactInfoSchema,
    billingInfo: BillingInfoSchema,
    finacialInfo: FinancialResponsibleSchema,
    legalInfo: LegalRepresentativeSchema,
    AdditionalContactsSchema: AdditionalContactsSchema,
  })
  .required();
