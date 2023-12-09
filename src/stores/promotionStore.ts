import { defineStore } from 'pinia';
import { ref } from 'vue';

import { HttpClient } from 'src/HttpClient/http';

const route = 'promotion';

const { http } = new HttpClient();

export const usePromotionStore = defineStore('promotionStore', () => {
  const promotion = ref<any | null>(null);

  const getPromotion = async () => {
    const { data } = await http.get<any[]>(route);
    promotion.value = data;
    return data;
  };

  return {
    promotion,
    getPromotion,
  } as const;
});
