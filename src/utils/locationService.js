const axios = require('axios');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const getCoordinates = async (address) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    if (response.data.results.length === 0) {
      throw new Error('Address not found');
    }

    const { lat, lng } = response.data.results[0].geometry.location;
    return { latitude: lat, longitude: lng };
  } catch (error) {
    throw new Error(`Geocoding error: ${error.message}`);
  }
};

const calculateFare = (distance, rideType) => {
  const baseFare = {
    bike: 2,
    car: 5,
    van: 7,
  };

  const perKmRate = {
    bike: 1.5,
    car: 2.5,
    van: 3.5,
  };

  const base = baseFare[rideType] || 5;
  const perKm = perKmRate[rideType] || 2.5;

  return base + (distance * perKm);
};

const getEstimatedDuration = (distance) => {
  return Math.ceil((distance / 30) * 60);
};

module.exports = {
  calculateDistance,
  getCoordinates,
  calculateFare,
  getEstimatedDuration,
};
