export class ClientTableDto {
  constructor(
    public id: string,
    public nome_cliente: string,
    public site: string,
    public email: string,
    public telefone: string,
    public status: string,
  ) {}
}
