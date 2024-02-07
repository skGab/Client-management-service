import { BadRequestException, Logger, PipeTransform } from '@nestjs/common';
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
      const formattedErrors = this.formatZodErrors(error.errors);

      throw new BadRequestException({
        message: 'Falha nos dados recebidos',
        errors: formattedErrors,
      });
    }

    // RETURNING VALID DATA
    return value;
  }

  private formatZodErrors(errors: any[]): any[] {
    return errors.map((err) => ({
      field: err.path.join('.'),
      message: `${err.message} (expected: ${err.expected}, received: ${err.received})`,
    }));
  }
}
