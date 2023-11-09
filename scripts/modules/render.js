import {
  calculateDewPoint,
  convertPressure,
  getCurrentDateTime,
  getWeatherForecastData,
  getWindDirection,
} from './helpers.js';

export const renderWidgetToday = (widget, data) => {
  const { dayOfMonths, month, year, hours, minutes, dayOfWeek } =
    getCurrentDateTime();
  console.log(data);
  widget.insertAdjacentHTML(
    'beforeend',
    `
  <div class="widget__today">
        <div class="widget__date-block">
          <p class="widget__date">${dayOfMonths} ${month} ${year}</p>
          <p class="widget__time">${hours}:${minutes}</p>
          <p class="widget__day">${dayOfWeek}</p>
        </div>
        <div class="widget__icon">
          <img class="widget__img" src="./icon/${
            data.weather[0].icon
          }.svg" alt="Погода" />
        </div>
        <div class="widget__wheather">
          <div class="widget__city">
            <p>${data.name}</p>
            <button
              class="widget__change-city"
              aria-label="Изменить город"
            ></button>
          </div>
          <p class="widget__temp-big">${(data.main.temp - 273.15).toFixed(
            1
          )}°C</p>
          <p class="widget__felt">ощущается</p>
          <p class="widget__temp-small">${(
            data.main.feels_like - 273.15
          ).toFixed(1)}°C</p>
        </div>
      </div>
  `
  );
};
export const renderWidgetOther = (widget, data) => {
  widget.insertAdjacentHTML(
    'beforeend',
    `
        <div class="widget__other">
        <div class="widget__wind">
          <p class="widget__wind-title">Ветер</p>
          <p class="widget__wind-speed">${data.wind.speed} м/с</p>
          <p class="widget__wind-text">${getWindDirection(data.wind.deg)}</p>
        </div>
        <div class="widget__humidity">
          <p class="widget__humidity-title">Влажность</p>
          <p class="widget__humidity-value">${data.main.humidity}%</p>
          <p class="widget__humidity-text">Т.Р: ${calculateDewPoint(
            data.main.temp - 273.15,
            data.main.humidity
          )} °C</p>
        </div>
        <div class="widget__pressure">
          <p class="widget__pressure-title">Давление</p>
          <p class="widget__pressure-value">${convertPressure(
            data.main.pressure
          )}</p>
          <p class="widget__pressure-text">мм рт.ст.</p>
        </div>
        `
  );
};
export const renderWidgetForecast = (widget, data) => {
  console.log(data);

  const widgetForecast = document.createElement('ul');
  widgetForecast.className = 'widget__forecast';
  widget.append(widgetForecast);

  const forecastData = getWeatherForecastData(data);
  const item = forecastData.map((item) => {
    const widgetDayItem = document.createElement('li');
    widgetDayItem.className = 'widget__day-item';
    widgetDayItem.insertAdjacentElement(
      'beforebegin',
      `
        <p class="widget__day-text">${item.dayOfWeek}</p>
        <img class="widget__day-img" src="./icon/${item.weatherIcon}.svg" alt="Погода" />
        <p class="widget__day-temp">${item.minTemp}°/${item.maxTemp}°</p>
    `
    );
    return widgetDayItem;
  });

  widgetForecast.append(...items);

  //   <ul class="widget__forecast">
  //   <li class="widget__day-item">
  //     <p class="widget__day-text">ср</p>
  //     <img class="widget__day-img" src="./icon/02d.svg" alt="Погода" />
  //     <p class="widget__day-temp">18.4°/13.7°</p>
  //   </li>
  //   <li class="widget__day-item">
  //     <p class="widget__day-text">чт</p>
  //     <img class="widget__day-img" src="./icon/03d.svg" alt="Погода" />
  //     <p class="widget__day-temp">17.3°/11.3°</p>
  //   </li>
  //   <li class="widget__day-item">
  //     <p class="widget__day-text">пт</p>
  //     <img class="widget__day-img" src="./icon/04d.svg" alt="Погода" />
  //     <p class="widget__day-temp">16.5°/10.9°</p>
  //   </li>
  //   <li class="widget__day-item">
  //     <p class="widget__day-text">сб</p>
  //     <img class="widget__day-img" src="./icon/01d.svg" alt="Погода" />
  //     <p class="widget__day-temp">18.6°/12.5°</p>
  //   </li>
  //   <li class="widget__day-item">
  //     <p class="widget__day-text">вс</p>
  //     <img class="widget__day-img" src="./icon/03d.svg" alt="Погода" />
  //     <p class="widget__day-temp">17.3°/11.2°</p>
  //   </li>
  // </ul>
};

export const showError = (widget, error) => {
  widget.textContent = error.toString();
  widget.classList.add('widget_error');
};
