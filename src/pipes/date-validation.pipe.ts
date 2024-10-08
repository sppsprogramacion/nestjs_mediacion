import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class DateValidationPipe implements PipeTransform {
  transform(value: any) {
    const date = new Date(value);

    // Verificar si es una fecha válida
    if (isNaN(date.getTime())) {
      throw new BadRequestException(`La fecha proporcionada (${value}) no es válida.`);
    }

    return value;  // Retorna el valor si es válido
  }
}