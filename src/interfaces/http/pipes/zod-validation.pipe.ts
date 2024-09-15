import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common'
import { ZodSchema } from 'zod'
import { fromError, fromZodError } from 'zod-validation-error'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value)
      return parsedValue
    } catch (error) {
      throw new BadRequestException({
        message: 'Validation failed',
        statusCode: 400,
        error: fromZodError(error).toString(),
      })
    }
  }
}
