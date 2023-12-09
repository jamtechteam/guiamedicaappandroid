import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHomeStore = defineStore('homeStore', () => {
  const isRedirectPromotion = ref<boolean>(false);

  const changeRedirectPromotion = () => {
    isRedirectPromotion.value = !isRedirectPromotion.value;
  }

  return {
    isRedirectPromotion,
    changeRedirectPromotion,
  } as const;
});
