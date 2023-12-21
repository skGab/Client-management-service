export class ClientFieldsVo {
  constructor(
    public id: string,
    public nome_fantasia: string,
    public email: string,
    public telefone: string,
    public ddd: string,
    public tipo: string[],
    public termino_vigencia?: string[],
  ) {}

  // get status(): string {
  //   if (this.tipo === 'avulso') return 'Avulso';
  // }
}
