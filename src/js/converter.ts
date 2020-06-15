export type Currency = 'EUR' | 'UAH' | 'USD';

type CurrencyPrices = {
  'EUR': number,
  'UAH': number,
  'USD': number
}

type CurrencyMap = {
  'EUR': CurrencyPrices,
  'UAH': CurrencyPrices,
  'USD': CurrencyPrices
}

interface CurrencyConverter {
  convert(value: number, from: Currency, to: Currency): number;
  toEUR(value: number, currency: Currency): number;
  toUAH(value: number, currency: Currency): number;
  toUSD(value: number, currency: Currency): number;
}


export class Converter implements CurrencyConverter {
  private cmap: CurrencyMap;

  constructor(usdToUah: number, eurToUah: number) {
    this.cmap = this.createCurrancyMap(usdToUah, eurToUah);
  }

  convert(value: number, from: Currency, to: Currency): number {
    let convertedRes = value;
    switch (to) {
      case 'EUR':
        convertedRes = this.toEUR(value, from);
        break;
      case 'USD':
        convertedRes = this.toUSD(value, from);
        break;
      case 'UAH':
        convertedRes = this.toUAH(value, from);
        break;
    }
    return convertedRes;
  }

  toEUR(value: number, currency: Currency): number {
    return this.cmap[currency]['EUR'] * value;
  }

  toUSD(value: number, currency: Currency): number {
    return this.cmap[currency]['USD'] * value;
  }

  toUAH(value: number, currency: Currency): number {
    return this.cmap[currency]['UAH'] * value;
  }

  private createCurrancyMap(usdToUah: number, eurToUah: number): CurrencyMap {
    return {
      'EUR': {
        'UAH': eurToUah,
        'EUR': 1,
        'USD': usdToUah / eurToUah,
      },
      'USD': {
        'UAH': usdToUah,
        'EUR': eurToUah / usdToUah,
        'USD': 1,
      },
      'UAH': {
        'UAH': 1,
        'EUR': 1 / eurToUah,
        'USD': 1 / usdToUah,
      },
    }
  }
}
