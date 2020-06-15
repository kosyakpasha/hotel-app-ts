const cheapBayPath = '../data/cheap-bay.json';
const midrangePalmsPath = '../data/midrange-palms.json';
const randomHotelPath = '../data/random-hotel.json';

type CheapBayDataType = {
  economy: string,
  standard: string
}

type CheapBayType = {
  '06/10/2020': CheapBayDataType,
  '06/11/2020': CheapBayDataType,
  '06/12/2020': CheapBayDataType,
  '06/13/2020': CheapBayDataType,
  '06/14/2020': CheapBayDataType,
  '06/15/2020': CheapBayDataType,
  '06/16/2020': CheapBayDataType,
  '06/17/2020': CheapBayDataType,
  '06/18/2020': CheapBayDataType,
}

type MidrangePalmsDataType = {
  date: string,
  price: number,
  currency: string,
}

interface MidrangePalmsInterface {
  'economy': MidrangePalmsDataType,
  'standard': MidrangePalmsDataType,
  'luxury': MidrangePalmsDataType,
}

type RandomHotelType = {
  date: string,
  prices: MidrangePalmsInterface
}

const formattedDataFunc = (...paths: Array<string>) => Promise.all(paths
  .map(async path => await fetch(path)))
  .then(dataResArr => {
    const cheapBayMap = new Map();
    const midrangePalmsMap = new Map();
    const randomHotelMap = new Map();
    const dataSet = new Set();
    const [ cheapBayPath, midrangePalmsPath, randomHotelPath ] = dataResArr;

    cheapBayPath.json().then((data: CheapBayType) => {
      Object.entries(data).forEach(([key, value]: [string, CheapBayDataType]): void => {
        const dateArr = key.split('/');
        const date = `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`;
        for (let [keyIn, valueIn] of Object.entries(value)) {
          const valueInArr = valueIn.split(' ');
          const price = Number(valueInArr[0]).toFixed(2);
          const currency = valueInArr[1];
          cheapBayMap.set(`${date}Cheap bay${keyIn}${price}${currency}`, {
            date,
            name: 'Cheap bay',
            type: keyIn,
            price,
            currency
          });
        }
      });
    });

    midrangePalmsPath.json().then((data: MidrangePalmsInterface) => {
      Object.entries(data).forEach(([key, value]: [string, Array<MidrangePalmsDataType>]): void => {
        value.forEach(({ date, currency, price }: MidrangePalmsDataType) => {
          midrangePalmsMap.set(`${date}Mid-range Palms${key}${price.toFixed(2)}${currency}`, {
            date,
            name: 'Mid-range Palms',
            type: key,
            price: price.toFixed(2),
            currency
          });
        });
      })
    });

    return randomHotelPath.json().then((data: Array<RandomHotelType>) => {
      data.map(dataObj => {
        const { date, prices } = dataObj;
        for (let [key, value] of Object.entries(prices)) {
          const { value: price, currency } = value;
          const fixedPrice = price.toFixed(2);

          randomHotelMap.set(`${date}Random Hotel${key}${fixedPrice}${currency}`, {
            date,
            name: 'Random Hotel',
            type: key,
            price: fixedPrice,
            currency
          });
        }
      });

      [cheapBayMap, midrangePalmsMap, randomHotelMap].forEach(map => {
        map.forEach(value => dataSet.add(value));
      });

      return dataSet;
    });
  });

const formattedData = formattedDataFunc(cheapBayPath, midrangePalmsPath, randomHotelPath);

export default formattedData;
