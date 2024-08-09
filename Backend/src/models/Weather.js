import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
  location: { type: String, required: true },
  data: { type: Object, required: true },
  created_at: { type: Date, default: Date.now },
});

const Weather = mongoose.model('Weather', weatherSchema);

export default Weather;
