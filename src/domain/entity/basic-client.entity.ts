import { ClientCnpj } from './client-cnpj.entity';
import { MainEntity } from './main.entity';

export interface BasicClient {
  id?: string;
  nome_cliente: string;
  site: string;
  email: string;
  telefone: string;
}
export class BasicClientEntity extends MainEntity {
  constructor(
    public basicClient: BasicClient,
    public clientCnpj?: ClientCnpj[],
  ) {
    super(basicClient.id);
  }
}
