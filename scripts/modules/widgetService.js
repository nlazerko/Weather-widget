import { fetchWeather, fetchForecast } from './APIservice.js';
import {
  renderWidgetForecast,
  renderWidgetOther,
  renderWidgetToday,
} from './render.js';

export const startWidget = async (city) => {
  const widget = document.createElement('div');
  widget.classList.add('widget');

  const dataWeather = await fetchWeather(city);

  if (dataWeather.succes) {
    renderWidgetToday(widget, dataWeather.data);
    renderWidgetOther(widget, dataWeather.data);
  } else {
    showError(dataWeather.error);
  }

  const dataForecast = await fetchForecast(city);

  if (dataForecast.succes) {
    renderWidgetForecast(widget, dataForecast.data);
  } else {
    showError(dataForecast.error);
  }
  return widget;
};
