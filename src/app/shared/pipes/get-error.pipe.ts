import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getError'
})
export class GetErrorPipe implements PipeTransform {
  messages = {
    required: 'Este campo es requerido',
    noWhiteSpace: 'El campo no puede venir en blanco'
  };

  transform(value: any, custom: any = {}): any {
    if (value) {
      const message = Object.keys(value)[0];
      return {...this.messages, ...custom}[message] || message;
    }
    return '';
  }
}
