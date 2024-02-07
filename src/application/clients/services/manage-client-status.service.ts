import { Injectable, Logger } from '@nestjs/common';
import { ClientTableVo } from 'src/domain/valueObject/client-table.vo';

@Injectable()
export class ManageClientStatus {
  private readonly logger = new Logger(ManageClientStatus.name);

  run(client: ClientTableVo): string {
    try {
      // CHECK FOR CLIENTS
      if (client.contracts.length == 0) return 'inativo';

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
          return 'Ativo';
        }

        return 'Inativo';
      });

      // CHECK IF HAS ACTIVE DATES ON THE ARRAY STATUS
      // RETURN ATIVO IF HAS
      if (status.includes('Ativo')) return 'Ativo';

      return 'Inativo';
    } catch (error) {
      this.logger.error(error);
      return 'Erro interno';
    }
  }
}
