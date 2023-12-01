import { BadGatewayException, Logger, PipeTransform } from '@nestjs/common';
import { ZodObject } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  private readonly logger = new Logger(ZodValidationPipe.name);

  constructor(private schema: ZodObject<any>) {}

  transform(value: any) {
    try {
      // VALIDATE DATA
      this.schema.parse(value);
    } catch (error) {
      // LOG THE ERROR ON THE CONSOLE
      this.logger.error(error.message);

      // LOG THE MESSAGE TO THE CLIENT
      throw new BadGatewayException(
        `Não foram encontrados campos para validação`,
      );
    }

    // RETURNING VALID DATA
    return value;
  }
}
