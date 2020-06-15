import { tableTemplateProp } from './render-table';

export const tableTemplate = async (data: Promise<tableTemplateProp>) => {
  const renderData = await data;
  const { 'Cheap bay': cheapBym, 'Mid-range Palms': midRangePalms, 'Random Hotel': randomHotel } = renderData;

  return `<table>
    <thead>
        <tr>
            <td></td>
            <td>Random Hotel</td>
            <td>Mid-range Palms</td>
            <td>Cheap bay</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Economy</td>
            <td>${randomHotel.economy}</td>
            <td>${midRangePalms.economy}</td>
            <td>${cheapBym.economy}</td>
        </tr>
        <tr>
            <td>Standard</td>
            <td>${randomHotel.standard}</td>
            <td>${midRangePalms.standard}</td>
            <td>${cheapBym.standard}</td>
        </tr>
        <tr>
            <td>Premium</td>
            <td>${randomHotel.luxury}</td>
            <td>${midRangePalms.luxury}</td>
            <td>${cheapBym.luxury}</td>
        </tr>
    </tbody>
  </table>`;
};
