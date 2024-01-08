import { MainEntity } from './main.entity';

export interface ClientContract {
  razao_social: string;
  nome_fantasia: string;
  site: string;
  cnpj_cpf: string;
  insc_estadual: string;
  email: string;

  //   INFO ATENDIMENTO
  endereco_atendimento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  ddd: string;
  fax: string;
  telefone: string;

  //   INFO FATURAMENTO
  endereco_faturamento: string;
  bairro_faturamento: string;
  cep_faturamento: string;
  cidade_faturamento: string;
  estado_faturamento: string;
  ddd_faturamento: string;
  fax_faturamento: string;
  telefone_faturamento: string;

  //   RESPONSAVEL FINANCEIRO
  responsavel_financeiro: string;
  ddd_financeiro: string;
  telefone_financeiro: string;
  email_financeiro: string;

  // REPRESENTANTE LEGAL (Obrigatorio)
  nome_representante: string;
  estado_civil_representante: string;
  profissao_representante: string;
  rg_representante: string;
  cpf_representante: string;
  email_representante: string;
  telefone_representante: string;
  nascimento_representante: string;

  // INFO BOLETOS E NOTAS FISCAIS
  email_boleto_notas: string;

  // TESTEMUNHA / SEGUNDO CONTATO
  nome_segundo_contato: string;
  estado_civil_segundo_contato: string;
  profissao_segundo_contato: string;
  rg_segundo_contato: string;
  cpf_segundo_contato: string;
  email_segundo_contato: string;
  telefone_segundo_contato: string;
  nascimento_segundo_contato: string;

  //   TERCEIRO CONTATO
  nome_terceiro_contato: string;
  estado_civil_terceiro_contato: string;
  profissao_terceiro_contato: string;
  rg_terceiro_contato: string;
  cpf_terceiro_contato: string;
  email_terceiro_contato: string;
  telefone_terceiro_contato: string;
  nascimento_terceiro_contato: string;
}
export class ClientEntity extends MainEntity {
  constructor(public clientContract: ClientContract) {
    super();
  }
}
