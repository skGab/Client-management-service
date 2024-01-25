import { ContractRegistrationDto } from '../contracts/dtos/contract-registration.dto';
import { ClientCnpjRegistrationDto } from '../clients/dtos/client-cnpj-registration.dto';
import { Contract } from 'src/domain/entity/contract.entity';
import { BasicClient, Client } from 'src/domain/entity/client.entity';
import { BasicClientDto } from '../clients/dtos/basic-client.dto';

export class EntityFactoryService {
  public mapContractEntity(
    contractRegistrationDto: (typeof ContractRegistrationDto)['_input'],
  ): Contract {
    return {
      cliente_novo: contractRegistrationDto.cliente_novo,
      cnpj_cpf: contractRegistrationDto.cnpj_cpf,
      razao_social: contractRegistrationDto.razao_social,
      nome_fantasia: contractRegistrationDto.nome_fantasia,
      nome_contato: contractRegistrationDto.nome_contato,
      email_contato: contractRegistrationDto.email_contato,
      servicos_prestados: contractRegistrationDto.servicos_prestados,
      emissao_de_nota: contractRegistrationDto.emissao_de_nota,
      retencao_iss_emissao_nota_fiscal:
        contractRegistrationDto.retencao_iss_emissao_nota_fiscal,
      forma_recebimento: contractRegistrationDto.forma_recebimento,
      tipo: contractRegistrationDto.tipo,

      //   RECORRENTE
      inicio_vigencia: contractRegistrationDto.recorrente?.inicio_vigencia,
      termino_vigencia: contractRegistrationDto.recorrente?.termino_vigencia,
      periodicidade: contractRegistrationDto.recorrente?.periodicidade,
      valor_do_periodo: contractRegistrationDto.recorrente?.valor_do_periodo,
      observacoes_adicionais:
        contractRegistrationDto.recorrente?.observacoes_adicionais,

      //   AVULSO
      valor_total_servicos:
        contractRegistrationDto.avulso?.valor_total_servicos,
      numero_parcelas: contractRegistrationDto.avulso?.numero_parcelas,
      data_vencimento: contractRegistrationDto.avulso?.data_vencimento,
      observacoes_adicionais_nota_fiscal:
        contractRegistrationDto.avulso?.observacoes_adicionais_nota_fiscal,
    };
  }

  public mapClientToEntity(
    basicClientDto: (typeof BasicClientDto)['_input'],
  ): BasicClient {
    return {
      nome_cliente: basicClientDto.nome_cliente,
      site: basicClientDto.site,
      email: basicClientDto.email,
      telefone: basicClientDto.telefone,
    };
  }
}
