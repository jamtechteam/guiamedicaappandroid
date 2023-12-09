import { defineStore } from 'pinia';
import { ref } from 'vue';

import { ICategoryApp } from 'src/interfaces/ICategoryApp.interface';

import { HttpClient } from 'src/HttpClient/http';

const route = 'categories-app';

const { http } = new HttpClient();

export const useCategoryAppStore = defineStore('categoriesAppStore', () => {
  const categoryApp = ref<ICategoryApp | null>(null);
  const categoriesApp = ref<ICategoryApp[]>([]);

  const categoriesList = ref([]);
  const loadedCategoriesList = ref<boolean>(false);

  const getCategoriesApp = async () => {
    const { data } = await http.get<ICategoryApp[]>(`${route}`);
    categoriesApp.value = data;
    return data;
  };

  const getCategoriesAppCarousel = async () => {
    const { data } = await http.get<ICategoryApp[]>(`${route}/carousel`);
    categoriesApp.value = data;
    return data;
  };

  const resetCategoriesList = () => {
    console.log('resetCategoriesList');
    categoriesList.value = { data: {} };
    loadedCategoriesList.value = false;
  };

  const getCategoriesById = async (id: string, city?: string) => {
    /* console.log('getCategoriesById', city);
    if (
      categoriesList.value.data &&
      categoriesList.value.data[id] &&
      loadedCategoriesList.value
    ) {
      loadedCategoriesList.value = false;
      return categoriesList.value.data[id];
    } */
    const { data } = await http.get<any>(`${route}/by-id/${id}?city=${city}`);
    categoriesList.value = data;
    loadedCategoriesList.value = true;
    return data;
  };

  return {
    categoryApp,
    categoriesApp,
    categoriesList,
    getCategoriesApp,
    getCategoriesAppCarousel,
    getCategoriesById,
    resetCategoriesList,
  } as const;
});
