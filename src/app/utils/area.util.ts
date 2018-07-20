import { city_data } from './area.data';

export const getProvinces = () => {
  const provinces = [];
  for (let province in city_data) {
    provinces.push(province);
  }
  return provinces;
}

export const getCitiesByProvince = (province) => {
  if (!province || !city_data[province]) {
    return [];
  }
  const cities = [];
  const val = city_data[province];
  for (let city in val) {
    cities.push(city);
  }
  return cities;
}

export const getAreaByCity = (province, city) => {
  if (!province || !city_data[province] || !city_data[province][city]) {
    return [];
  }
  return city_data[province][city];
}