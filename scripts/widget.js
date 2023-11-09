import { cityServiceSearch } from './modules/search.js';
import { startWidget } from './modules/widgetService.js';

const initWidget = async (app) => {
  const city = 'Минск';
  const widget = await startWidget(city);
  app.append(widget);

  cityServiceSearch(widget);
};

initWidget(document.querySelector('#app'));
