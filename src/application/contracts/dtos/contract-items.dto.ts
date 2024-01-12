export class ContractItemsDto {
  constructor(
    public servicos: {
      nome: string[];
      quantidade: number;
    }[],
  ) {}
}
