import fetchWeatherData from '../services/weatherService.js';
import redis from '../utils/redisClient.js';

const CACHE_EXPIRY = 3600; 

const getWeather = async (req, res, next) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  try {
    const cachedData = await redis.get(location);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const weatherData = await fetchWeatherData(location);

    await redis.setex(location, CACHE_EXPIRY, JSON.stringify(weatherData));

    res.status(200).json(weatherData);  // Return the complete weather data
  } catch (error) {
    next(error);
  }
};

export { getWeather };
  