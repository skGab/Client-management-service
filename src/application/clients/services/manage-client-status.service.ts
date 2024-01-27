import { Injectable, Logger } from '@nestjs/common';
import { ClientTableVo } from 'src/domain/valueObject/client-table.vo';

@Injectable()
export class ManageClientStatus {
  private readonly logger = new Logger(ManageClientStatus.name);

  run(client: ClientTableVo): string {
    try {
      // CHECK FOR CLIENTS
      if (!client.contracts) return 'nenhum contrato registrado';

      // GET CONTRACT TYPES
      const contractTypes = client.contracts.map((contract) =>
        contract.tipo.toLocaleLowerCase(),
      );

      // GET CONTRACT DATES
      const contractDates = client.contracts.map(
        (contract) => contract.termino_vigencia,
      );

      // GET CURRENT DATES
      const currentDate = new Date();

      // FOR EACH CONTRACT DATE CHECK IF THE DATE IF MORE THAN THE CURRENT DATE
      // IF IS RETURN "ATIVO"
      const status = contractDates.map((date) => {
        const contractDate = new Date(date);

        if (contractDate >= currentDate) {
          return 'ativo';
        }

        return 'inativo';
      });

      // CHECK IF HAS ACTIVE DATES ON THE ARRAY STATUS
      // RETURN ATIVO IF HAS
      // RETURN AVULSO IF NO ACTIVE ON THE STATUS
      if (status.includes('ativo')) {
        return 'ativo';
      } else if (contractTypes.includes('avulso')) {
        return 'ativo';
      }

      return 'inativo';
    } catch (error) {
      this.logger.error(error);
    }
  }
}
