const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '68cfb759e25f2fd211f7fbd196264be0';

export const fetchWeather = async (city) => {
  try {
    const response = await fetch(
      `${API_URL}weather?q=${city}&appid=${API_KEY}&lang=ru`
    );

    if (!response.ok) {
      throw new Error('Ошибка запроса');
    }

    const data = await response.json();

    return { succes: true, data };
  } catch (error) {
    return { succes: false, error };
  }
};

export const fetchForecast = async (city) => {
  try {
    const response = await fetch(
      `${API_URL}forecast?q=${city}&appid=${API_KEY}&lang=ru`
    );

    if (!response.ok) {
      throw new Error('Ошибка запроса');
    }

    const data = await response.json();

    return { succes: true, data };
  } catch (error) {
    return { succes: false, error };
  }
};

export const getCity = async () => {
  const url = 'https://ipapi.co/city/';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Ошибка получения города');
    }
    const city = await response.text();
    return { succes: true, city };
  } catch (error) {
    console.error(error);
    return { succes: false, error };
  }
};
