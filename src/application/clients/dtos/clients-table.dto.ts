export class ClientFieldsDto {
  constructor(
    public id: string,
    public nome_cliente: string,
    public email: string,
    public site: string,
    public telefone: string,
    public status: string,
  ) {}
}
