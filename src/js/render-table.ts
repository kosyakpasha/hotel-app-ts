import { tableTemplate } from './table-template';

export type tableTemplateProp = {
  'Cheap bay': tableTemplateElemProp,
  'Mid-range Palms': tableTemplateElemProp,
  'Random Hotel': tableTemplateElemProp,
}

type tableTemplateElemProp = {
  economy: string,
  standard: string,
  luxury: string,
}

export default async function renderTable(container: HTMLElement, data: Promise<tableTemplateProp>): Promise<void> {
  container.innerHTML = await tableTemplate(data);
}
