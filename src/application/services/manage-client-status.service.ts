import { Injectable, Logger } from '@nestjs/common';
import { ClientFieldsVo } from 'src/domain/valueObject/client-fields.vo';

@Injectable()
export class ManageClientStatus {
  private readonly logger = new Logger(ManageClientStatus.name);

  // PRECISO DESENVOLVER A LOGICA DE STATUS

  run(response: ClientFieldsVo[]): string {
    // GET CONTRACT TYPES
    const contractstypes = response.flatMap((client) => {
      return client.contracts.map((contract) => contract.tipo);
    });

    // GET CONTRACT DATES
    const contractsDates = response.flatMap((client) => {
      return client.contracts.map((contract) => contract.termino_vigencia);
    });
    // const response1 = contractsDates.find()

    return '';
  }
}
