import { cityServiceSearch } from './modules/search.js';
import { startWidget } from './modules/widgetService.js';

const initWidget = async (app) => {
  const widget = await startWidget();
  app.append(widget);

  cityServiceSearch(widget);
};

initWidget(document.querySelector('#app'));
