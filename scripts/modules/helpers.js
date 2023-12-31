export const getCurrentDateTime = () => {
  const months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];

  const weekdays = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ];

  const date = new Date();
  const dayOfMonths = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const dayOfWeek = weekdays[date.getDay()];

  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    hours = `0${minutes}`;
  }

  return { dayOfMonths, month, year, hours, minutes, dayOfWeek };
};

export const calculateDewPoint = (temp, humidity) => {
  const a = 17.27;
  const b = 237.7;

  const ft = (a * temp) / (b + temp) + Math.log(humidity / 100);
  const dewPoint = (b * ft) / (a - ft);
  return dewPoint.toFixed(1);
};

export const convertPressure = (pressure) => {
  const mmHg = pressure * 0.750063755419211;
  return mmHg.toFixed(2);
};

export const getWeatherForecastData = (data) => {
  const forecast = data.list.filter(
    (item) =>
      new Date(item.dt_txt).getHours() === 12 &&
      new Date(item.dt_txt).getDate() > new Date().getDate() &&
      new Date(item.dt_txt).getDate() < new Date().getDate() + 5
  );

  const forecastData = forecast.map((item) => {
    const date = new Date(item.dt_txt);
    const weekdaysShort = ['вc', 'пн', 'вт', 'ср', 'че', 'пт', 'сб'];
    const dayOfWeek = weekdaysShort[date.getDay()];
    const weatherIcon = item.weather[0].icon;
    let minTemp = Infinity;
    let maxTemp = -Infinity;

    for (let i = 0; i < data.list.length; i++) {
      const temp = data.list[i].main.temp;
      const tempDate = new Date(data.list[i].dt_txt);

      if (tempDate.getDate() === date.getDate() && temp < minTemp) {
        minTemp = temp;
      } else if (tempDate.getDate() === date.getDate() && temp > maxTemp) {
        maxTemp = temp;
      }
    }

    return { dayOfWeek, weatherIcon, minTemp, maxTemp };
  });

  return forecastData;
};
