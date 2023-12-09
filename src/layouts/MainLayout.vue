<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

import CFooter from 'src/components/Layout/CFooter/CFooter.vue';

import { useLocationStore } from 'src/stores/locationStore';
import { useHomeStore } from 'src/stores/homeStore';

const locationStore = useLocationStore();
const homeStore = useHomeStore();

const router = useRouter();

const getLocation = () => {
  locationStore.getStorage();
};

const verifyLocation = () => {
  if (!locationStore.location) {
    router.push('/configuration/location?firstTime=1');
  }
};

// escuchar la variable del home "isRedirectPromotion" para cuando sea true redireccionar a la pagina de promociones
watch(
  () => homeStore.isRedirectPromotion,
  (value) => {
    if (value) {
      router.push('/promotion');
    }
  }
);

onMounted(() => {
  getLocation();
  verifyLocation();
});
</script>

<template>
  <q-layout view="lHh lpR lFf">
    <c-footer />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
