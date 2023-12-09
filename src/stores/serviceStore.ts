import { IService, ICategory } from './../interfaces/IService.interface';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { HttpClient } from 'src/HttpClient/http';

const route = 'services';
const routeCategories = 'categories';

const { http } = new HttpClient();

export const useServiceStore = defineStore('serviceStore', () => {
  const service = ref<IService | null>(null);
  const loadedServices = ref(false);
  const services = ref<IService[]>([]);

  const loadedCategories = ref(false);
  const categories = ref<ICategory[]>([]);
  const category = ref<ICategory | null>(null);

  const getServices = async () => {
    if (services.value.length > 0 && loadedServices.value) {
      loadedServices.value = false;
      return services.value;
    }

    const { data } = await http.get(route);
    services.value = data;
    loadedServices.value = true;
    return data;
  };

  const getCategories = async () => {
    if (categories.value.length > 0 && loadedCategories.value) {
      loadedCategories.value = false;
      return categories.value;
    }

    const { data } = await http.get(routeCategories);
    categories.value = data;
    loadedCategories.value = true;
    return data;
  };

  const getServicesByCategoryId = async (id: string) => {
    const { data } = await http.get(`${route}/category/${id}`);
    services.value = data;
    return data;
  };

  return {
    service,
    services,
    category,
    categories,
    getServices,
    getCategories,
    getServicesByCategoryId,
  } as const;
});
