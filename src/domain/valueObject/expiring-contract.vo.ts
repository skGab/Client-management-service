export class ExpiringContractVo {
  constructor(
    private id: string,
    public cnpj_cpf: string,
    public valor_total: string,
    public tipo: string,
    public data_vencimento?: string,
    public termino_vigencia?: string,
  ) {}

  public getId() {
    return this.id;
  }
}
