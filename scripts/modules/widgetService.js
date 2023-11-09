import { fetchWeather, fetchForecast, getCity } from './APIservice.js';
import {
  renderWidgetForecast,
  renderWidgetOther,
  renderWidgetToday,
  showError,
} from './render.js';

export const startWidget = async (city, widget) => {
  if (!city) {
    const dataCity = await getCity();
    if (dataCity.succes) {
      city = dataCity.city;
    } else {
      showError(widget, dataCity.error);
    }
  }
  if (!widget) {
    widget = document.createElement('div');
    widget.classList.add('widget');
  }

  const dataWeather = await fetchWeather(city);

  if (dataWeather.succes) {
    renderWidgetToday(widget, dataWeather.data);
    renderWidgetOther(widget, dataWeather.data);
  } else {
    showError(widget, dataWeather.error);
  }

  const dataForecast = await fetchForecast(city);

  if (dataForecast.succes) {
    renderWidgetForecast(widget, dataForecast.data);
  } else {
    showError(widget, dataForecast.error);
  }
  return widget;
};
