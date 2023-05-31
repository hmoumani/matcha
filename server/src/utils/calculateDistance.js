import axios from 'axios';

export const getDistanceBetweenTwoLocations = (loc1, loc2) => {
  const radius = 6371; // Earth's radius in km
  const lat1 = loc1.lat * (Math.PI / 180);
  const lat2 = loc2.lat * (Math.PI / 180);
  const deltaLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
  const deltaLng = (loc2.lng - loc1.lng) * (Math.PI / 180);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(radius * c) + ' km';
};

export async function getAddressFromLocation(loc) {
  const API_KEY = 'AIzaSyCMYpgmm8HW9OlF1c4nDbIZe4I60l35Dj4';
  const lat = loc.lat;
  const lng = loc.lng;

  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

  try {
    const { data } = await axios.get(URL);
    if (data.status === 'OK') {
      for (let i = 0; i < data.results.length; i++) {
        const result = data.results[i];
        for (let j = 0; j < result.address_components.length; j++) {
          const component = result.address_components[j];
          if (component.types.includes('locality')) {
            const city = component.long_name;
            for (let k = 0; k < result.address_components.length; k++) {
              const countryComponent = result.address_components[k];
              if (countryComponent.types.includes('country')) {
                const country = countryComponent.long_name;
                return `${city}, ${country}`;
              }
            }
          }
       }
      }
    } else {
      throw new Error('Geocoding failed: ' + data.status);
    }
  } catch (error) {
    throw error;
  }
}
