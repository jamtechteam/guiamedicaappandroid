import { defineStore } from 'pinia';
import { ref } from 'vue';

import { IDoctor } from './../interfaces/IDoctor.interface';

const storage_name = 'FAVORITE_DOCTOR';

export const useFavoriteDoctorStore = defineStore('favoriteDoctorStore', () => {
  const favorites = ref<IDoctor[]>([]);

  const saveStorage = () => {
    localStorage.setItem(storage_name, JSON.stringify(favorites.value));
  };

  const getStorage = () => {
    const favorite = localStorage.getItem(storage_name);
    if (favorite) {
      favorites.value = JSON.parse(favorite);
    }
  };

  const addFavorite = (doctor: IDoctor) => {
    favorites.value.push(doctor);
    saveStorage();
  };

  const removeFavorite = (id: string) => {
    favorites.value = favorites.value.filter((favorite) => favorite._id !== id);
    saveStorage();
  };

  const isFavorite = (id: string) => {
    getStorage();
    return favorites.value.some((favorite) => favorite._id === id);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    getStorage,
  };
});
