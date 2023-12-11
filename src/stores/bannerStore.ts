import { defineStore } from 'pinia';
import { ref } from 'vue';

import { IBanner } from 'src/interfaces/IBanner.interface';

import { HttpClient } from 'src/HttpClient/http';

const route = 'banners';

const { http } = new HttpClient();

export const useBannerStore = defineStore('bannerStore', () => {
  const banner = ref<IBanner | null>(null);
  const banners = ref<IBanner[]>([]);
  const bannersPosition = ref<IBanner[]>([]);

  const getBanners = async (state: string) => {
    const { data } = await http.get<IBanner[]>(`${route}/positions?state=${state}`);
    banners.value = data;
    return data;
  };

  const getBanner = async (id: string) => {
    const { data } = await http.get<IBanner>(`${route}/${id}`);
    banner.value = {
      ...data,
      main_image: {
        src: data.main_image,
        file: null,
      },
      internal_image: {
        src: data.internal_image,
        file: null,
      },
    };

    return banner.value;
  };

  return {
    banner,
    banners,
    bannersPosition,
    getBanners,
    getBanner,
  } as const;
});
