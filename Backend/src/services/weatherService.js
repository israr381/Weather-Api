import axios from 'axios';
import Weather from '../models/Weather.js';
import dotenv from 'dotenv';

dotenv.config();

const fetchWeatherData = async (location) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    const weatherData = response.data;

    let weatherEntity = await Weather.findOne({ location });

    if (weatherEntity) {
      weatherEntity.data = weatherData;
      weatherEntity.updatedAt = new Date(); 
    } else {
      weatherEntity = new Weather({ location, data: weatherData });
    }

    await weatherEntity.save();  

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    throw new Error('Unable to fetch weather data');
  }
};

export default fetchWeatherData;
