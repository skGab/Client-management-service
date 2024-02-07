export class ClientTableVo {
  constructor(
    public id: string,
    public nome_cliente: string,
    public site: string,
    public email: string,
    public telefone: string,
    // PRECISO AJUSTAR A LOGICA DE STATUS
    public contracts: { tipo: string; termino_vigencia: string }[],
  ) {}
}
