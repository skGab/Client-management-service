export class ClientFieldsDto {
  constructor(
    public id: string,
    public nome_fantasia: string,
    public email: string,
    public telefone: string,
    public ddd: string,
    public status: string,
  ) {}
}
