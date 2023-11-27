export class ClientRegistrationDto {
  private id: string;
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
