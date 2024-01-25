export class ClientFieldsVo {
  constructor(
    public id: string,
    public nome_cliente: string,
    public site: string,
    public email: string,
    public telefone: string,
    public contracts: { tipo: string; termino_vigencia: string }[],
  ) {}

  // get status(): string {
  //   if (this.tipo === 'avulso') return 'Avulso';
  // }
}
