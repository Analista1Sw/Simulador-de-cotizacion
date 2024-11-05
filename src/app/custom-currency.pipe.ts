import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) return '';
    let valueStr = value.toString();
    let intPart = valueStr.slice(0, -5);
    let decimalPart = valueStr.slice(-5);
    return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + decimalPart;
  }

}
