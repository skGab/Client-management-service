import { MainEntity } from './main.entity';

export interface Contract {
  id?: string;
  cliente_novo: boolean;
  cnpj_cpf: string;
  razao_social?: string;
  nome_fantasia?: string;
  nome_contato?: string;
  email_contato?: string;
  servicos_prestados: string[];
  emissao_de_nota: string;
  retencao_iss_emissao_nota_fiscal: string;
  forma_recebimento: string;
  tipo: string;

  //   RECORRENTE
  inicio_vigencia?: string;
  termino_vigencia?: string;
  periodicidade?: string;
  valor_do_periodo?: string;
  observacoes_adicionais?: string;

  //   AVULSO
  valor_total_servicos?: string;
  numero_parcelas?: string;
  data_vencimento?: string;
  observacoes_adicionais_nota_fiscal?: string;
}

export class ContractEntity extends MainEntity {
  constructor(public contract: Contract) {
    super(contract.id);
  }
}
