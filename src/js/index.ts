import formattedData from "./formated-data";
import renderTable from "./render-table";
import { Converter } from "./converter";
import { strict as assert } from 'assert';
import { Currency } from './converter';
import './../css/style.css';

type HotelDataProp = {
  currency: Currency,
  date: string,
  name: string,
  price: string,
  type: string,
}

type PriceProp = {
  'economy': string,
  'standard': string,
  'luxury': string,
}

type TemplateDataProp = {
  'Cheap bay': PriceProp,
  'Mid-range Palms': PriceProp,
  'Random Hotel': PriceProp
}

class App {
  private table: HTMLElement | null;
  private date: HTMLInputElement | null;
  private currency: HTMLSelectElement | null;
  private dateValue: string;
  private currencyValue: Currency | null;
  private templateData: TemplateDataProp;

  constructor() {
    this.table = document.querySelector('#container');
    this.date = document.querySelector('input');
    this.currency = document.querySelector('select');
    this.dateValue = (<HTMLInputElement>this.date).value;
    // @ts-ignore
    this.currencyValue = this.currency && this.currency.value;
    this.templateData = {
      'Cheap bay': {
        'economy': 'N/A',
        'standard': 'N/A',
        'luxury': 'N/A',
      },
      'Mid-range Palms': {
        'economy': 'N/A',
        'standard': 'N/A',
        'luxury': 'N/A',
      },
      'Random Hotel': {
        'economy': 'N/A',
        'standard': 'N/A',
        'luxury': 'N/A',
      },
    };
  }

  private filterData = (date: string, currency: Currency) => {
    return formattedData.then((data: Set<any>) => {
      const converter = new Converter(26.5, 29.9);
      const currentData: HotelDataProp[] = [];

      data.forEach((value: HotelDataProp): void => {
        if (value.date === date) {
          if (value.currency === currency) {
            currentData.push(value)
          } else {
            const result = converter.convert(Number(value.price), value.currency, currency);
            value.price = result.toFixed(2);
            value.currency = currency;
            currentData.push(value)
          }
        }
      });

      currentData.forEach((data: HotelDataProp) => {
        for (let [key, value] of Object.entries(this.templateData)) {
          if (data.name === key) {
            for (let [keyOfV] of Object.entries(value)) {
              if (data.type === keyOfV) {
                // @ts-ignore
                this.templateData[key][keyOfV] = `${data.price}${data.currency}`
              }
            }
          }
        }
      });

      return this.templateData;
    });
  };

  handleError = (elemEntity: HTMLElement | null, elemName: string) => {
    if (!elemEntity) assert(elemEntity, `${elemName} doesn't exist`);
  };

  changeHandler = () => {
    this.date && this.date.addEventListener("change", e => {
      this.dateValue = (e.target as HTMLInputElement).value;
      this.handleError(this.table, "Table");
      if (this.table && this.currencyValue) {
        renderTable(this.table, this.filterData(this.dateValue, this.currencyValue));
      }
    });

    this.currency && this.currency.addEventListener("change", e => {
      // @ts-ignore
      this.currencyValue = (e.target as HTMLInputElement).value;
      this.handleError(this.table, "Table");
      if (this.table && this.currencyValue) {
        renderTable(this.table, this.filterData(this.dateValue, this.currencyValue));
      }
    });
  };

  init = () => {
    this.handleError(this.table, "Table");
    if (this.table && this.currencyValue) {
      renderTable(this.table, this.filterData(this.dateValue, this.currencyValue));
    }
    this.changeHandler();
  }
}

const app = new App();

app.init();
