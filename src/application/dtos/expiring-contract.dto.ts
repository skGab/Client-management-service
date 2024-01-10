export class ExpiringContractDto {
  constructor(
    public id: string,
    public cnpj_cpf: string,
    public email_contato: string,
    public tipo: string,
    public data_vencimento?: string,
    public termino_vigencia?: string,
  ) {}
}
