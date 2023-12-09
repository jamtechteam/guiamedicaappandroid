import { defineStore } from 'pinia';
import { ref } from 'vue';

import { useCategoryAppStore } from './categoryAppStore';
export interface ILocation {
  state: string;
  city: string;
}

const storeCategoryApp = useCategoryAppStore();

const storageName = 'CONFIG_LOCATION';
const storageCityName = 'CONFIG_CITY_NAME';
const storageStateName = 'CONFIG_STATE_NAME';

import { HttpClient } from 'src/HttpClient/http';

const { http } = new HttpClient();

export const useLocationStore = defineStore('locationStore', () => {
  const location = ref<ILocation | null>(null);

  const states = ref<ILocation[]>([]);
  const cities = ref<ILocation[]>([]);

  const firstInit = ref<boolean>(true);

  const setFirstInit = (value: boolean) => {
    firstInit.value = value;
  };

  const saveStorage = (
    payload: ILocation,
    cityName: string,
    stateName: string
  ) => {
    localStorage.setItem(
      storageName,
      JSON.stringify({
        ...payload,
      })
    );
    location.value = payload;
    saveCityNameStorage(cityName);
    saveStateNameStorage(stateName);
    storeCategoryApp.resetCategoriesList();
  };

  const saveCityNameStorage = (cityName: string) => {
    localStorage.setItem(storageCityName, cityName);
  };

  const saveStateNameStorage = (stateName: string) => {
    localStorage.setItem(storageStateName, stateName);
  };

  const getCityNameStorage = () => {
    const cityName = localStorage.getItem(storageCityName);
    return cityName;
  };

  const getStateNameStorage = () => {
    const stateName = localStorage.getItem(storageStateName);
    return stateName;
  };

  const getStorage = () => {
    const locationLS = localStorage.getItem(storageName);
    if (locationLS) {
      const locate = JSON.parse(locationLS);
      location.value = locate;
    }
    return location.value;
  };

  const getAllStatesActives = async () => {
    const { data } = await http.get('states/actives');
    states.value = data;
    return data;
  };

  const getAllCitiesActivesByState = async (id: string) => {
    const { data } = await http.get(`states/${id}/cities/actives`);
    cities.value = data;
    return data;
  };

  return {
    location,
    saveStorage,
    getStorage,
    states,
    getAllStatesActives,
    getAllCitiesActivesByState,
    getCityNameStorage,
    firstInit,
    setFirstInit,
    getStateNameStorage,
  } as const;
});
