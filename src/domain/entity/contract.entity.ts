import { MainEntity } from './main.entity';

export interface Contract {
  id?: string;
  cnpj_cpf: string;
  tipo: string;
  servicos_prestados: string[];
  inicio_vigencia: string;
  termino_vigencia: string;
  data_vencimento: string;
  valor_total: string;
  observacoes_adicionais?: string;

  //   RECORRENTE
  periodicidade?: string;
  //   AVULSO
  numero_parcelas?: string;
}

export class ContractEntity extends MainEntity {
  constructor(public contract: Contract) {
    super(contract.id);
  }
}
