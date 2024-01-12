import { Injectable } from '@nestjs/common';
import { ClientRepository } from 'src/domain/repository/client.repository';
import { PrismaService } from '../services/prisma-adapter.service';
import { ClientEntity } from 'src/domain/entity/client.entity';
import { ClientFieldsVo } from 'src/domain/valueObject/client-fields.vo';
import { ContractEntity } from 'src/domain/entity/contract.entity';

@Injectable()
export class ClientRepositoryService implements ClientRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ClientFieldsVo[]> {
    try {
      // FEETCHING CLIENT
      const response = await this.prisma.client.findMany({
        // WITH SPECIFIC FIELDS
        select: {
          id: true,
          nome_fantasia: true,
          email: true,
          ddd: true,
          telefone: true,
          contracts: {
            select: {
              tipo: true,
              termino_vigencia: true,
            },
          },
        },
      });

      // RETURN NULL IF ANY CLIENTS ON DB
      if (response.length === 0 || response === null) return null;

      // MAP REPSONSE TO VALUE OBJECT
      const clientsVo = response.map(
        (client) =>
          new ClientFieldsVo(
            client.id,
            client.nome_fantasia,
            client.email,
            client.ddd,
            client.telefone,
            client.contracts.map((contract) => ({
              tipo: contract.tipo,
              termino_vigencia: contract.termino_vigencia,
            })),
          ),
      );

      console.log(clientsVo);

      // RETURNING VO
      return clientsVo;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // FIND CLIENT BY ID
  async findOne(id: string): Promise<ClientEntity> {
    // GET THE CLIENT
    const client = await this.prisma.client.findUnique({
      where: { id: id },
      include: { contracts: true },
    });

    // MAPT THE CONTRACTS TO CONTRACTENTITY
    const contracts = client.contracts.map((contract) => {
      return new ContractEntity({
        cliente_novo: contract.cliente_novo,
        cnpj_cpf: contract.cnpj_cpf,
        razao_social: contract.razao_social,
        nome_fantasia: contract.nome_fantasia,
        nome_contato: contract.nome_contato,
        email_contato: contract.email_contato,
        servicos_prestados: contract.servicos_prestados as string[],
        emissao_de_nota: contract.emissao_de_nota,
        retencao_iss_emissao_nota_fiscal:
          contract.retencao_iss_emissao_nota_fiscal,
        forma_recebimento: contract.forma_recebimento,
        tipo: contract.tipo,

        //   RECORRENTE
        inicio_vigencia: contract.inicio_vigencia,
        termino_vigencia: contract.termino_vigencia,
        periodicidade: contract.periodicidade,
        valor_do_periodo: contract.valor_do_periodo,
        observacoes_adicionais: contract.observacoes_adicionais,

        //   AVULSO
        valor_total_servicos: contract.valor_total_servicos,
        numero_parcelas: contract.numero_parcelas,
        data_vencimento: contract.data_vencimento,
        observacoes_adicionais_nota_fiscal:
          contract.observacoes_adicionais_nota_fiscal,
      });
    });

    // MAP TO ENTITY
    const clientEntity = new ClientEntity(
      {
        id: id,
        razao_social: client.razao_social,
        nome_fantasia: client.nome_fantasia,
        site: client.site,
        cnpj_cpf: client.cnpj_cpf,
        insc_estadual: client.insc_estadual,
        email: client.email,

        //   INFO ATENDIMENTO
        endereco_atendimento: client.endereco_atendimento,
        bairro: client.bairro,
        cep: client.cep,
        cidade: client.cidade,
        estado: client.estado,
        ddd: client.ddd,
        fax: client.fax,
        telefone: client.telefone,

        //   INFO FATURAMENTO
        endereco_faturamento: client.endereco_faturamento,
        bairro_faturamento: client.bairro_faturamento,
        cep_faturamento: client.cep_faturamento,
        cidade_faturamento: client.cidade_faturamento,
        estado_faturamento: client.estado_faturamento,
        ddd_faturamento: client.ddd_faturamento,
        fax_faturamento: client.fax_faturamento,
        telefone_faturamento: client.telefone_faturamento,

        //   RESPONSAVEL FINANCEIRO
        responsavel_financeiro: client.responsavel_financeiro,
        ddd_financeiro: client.ddd_financeiro,
        telefone_financeiro: client.telefone_financeiro,
        email_financeiro: client.email_financeiro,

        // REPRESENTANTE LEGAL (Obrigatorio)
        nome_representante: client.nome_representante,
        estado_civil_representante: client.estado_civil_representante,
        profissao_representante: client.profissao_representante,
        rg_representante: client.rg_representante,
        cpf_representante: client.cpf_representante,
        email_representante: client.email_representante,
        telefone_representante: client.telefone_representante,
        nascimento_representante: client.nascimento_representante,

        // INFO BOLETOS E NOTAS FISCAIS
        email_boleto_notas: client.email_boleto_notas,

        // TESTEMUNHA / SEGUNDO CONTATO
        nome_segundo_contato: client.nome_segundo_contato,
        estado_civil_segundo_contato: client.estado_civil_segundo_contato,
        profissao_segundo_contato: client.profissao_segundo_contato,
        rg_segundo_contato: client.rg_segundo_contato,
        cpf_segundo_contato: client.cpf_segundo_contato,
        email_segundo_contato: client.email_segundo_contato,
        telefone_segundo_contato: client.telefone_segundo_contato,
        nascimento_segundo_contato: client.nascimento_segundo_contato,

        //   TERCEIRO CONTATO
        nome_terceiro_contato: client.nome_terceiro_contato,
        estado_civil_terceiro_contato: client.estado_civil_terceiro_contato,
        profissao_terceiro_contato: client.responsavel_financeiro,
        rg_terceiro_contato: client.rg_terceiro_contato,
        cpf_terceiro_contato: client.cpf_terceiro_contato,
        email_terceiro_contato: client.email_terceiro_contato,
        telefone_terceiro_contato: client.telefone_terceiro_contato,
        nascimento_terceiro_contato: client.nascimento_terceiro_contato,
      },
      contracts,
    );

    // RETURN IT
    return clientEntity;
  }

  async create(clientEntity: ClientEntity) {
    // MAP ENTITY TO PRISMA CLIENT
    const data = this.prisma.mapToPrismaClient(clientEntity);

    // CHECK IF CLIENT EMAIL ALREADY EXISTS ON THE DB
    const client = await this.prisma.client.findUnique({
      where: {
        email: data.email,
      },
    });

    // SAVE NEW CLIENT
    if (client === null) {
      await this.prisma.client.create({
        data,
      });

      return 'Novo cliente Registrado';
    }

    return 'Cliente já registrado';
  }

  // update(): void {
  //   throw new Error('Method not implemented.');
  // }
  // delete(): void {
  //   throw new Error('Method not implemented.');
  // }
}
