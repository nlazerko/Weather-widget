import { startWidget } from './modules/widgetService.js';

const initWidget = (app) => {
  const widget = startWidget();
  app.append(widget);
};

initWidget(document.querySelector('#app'));
