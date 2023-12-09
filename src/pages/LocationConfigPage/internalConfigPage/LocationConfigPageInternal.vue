<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useRouter, useRoute } from 'vue-router';

import CHeaderDinamic from 'src/components/Layout/CHeader/CHeaderDinamic/CHeaderDinamic.vue';
import LocationFormInternal from 'src/components/Location/LocationForm/internalLocationForm/LocationFormInternal.vue';

import { useLocationStore } from 'src/stores/locationStore';
import { Loading } from 'quasar';

const router = useRouter();
const route = useRoute();

const locationStore = useLocationStore();

const isBtnBack = computed(() => {
  const locate = locationStore.getStorage();

  // si en la ruta viene el query firstTime
  // entonces no se muestra el boton de atrás
  const { firstTime } = route.query as { firstTime: string };

  return !firstTime && locate;
});

Loading.hide();

const onBackKeyDown = () => {
  // si viene la propiedad firstTime en la ruta
  // y se presiona el boton atras del navegador
  // entonces deberia hacer como si se fuese a cerrar la app
  // y no volver a la pagina anterior
  const { firstTime } = route.query as { firstTime: string };

  if (firstTime) {
    navigator.app.exitApp();
  }
};

onMounted(() => {
  // se añade un documen listener para el boton atras del navegador
  // si viene la propiedad firstTime en la ruta
  // y se presiona el boton atras del navegador
  // entonces deberia hacer como si se fuese a cerrar la app
  // y no volver a la pagina anterior
  const { firstTime } = route.query as { firstTime: string };

  if (firstTime) {
    document.addEventListener('backbutton', onBackKeyDown, false);
  }
});
</script>

<template>
  <section>
    <CHeaderDinamic
      class="overflow-hidden"
      style="height: 160px; position: relative"
    >
      <template #content>
        <section
          class="fit row justify-center position-relative items-center bg-color-dinamic-header"
        >
          <q-btn
            v-if="isBtnBack"
            icon="arrow_back"
            color="white"
            flat
            @click="router.go(-1)"
            class="button-left-back"
          />
          <img
            src="logo-light.svg"
            alt="logo-guiamedica"
            class="logo-header-dinamic"
          />
        </section>
      </template>
    </CHeaderDinamic>

    <section class="column q-pt-lg q-px-md">
      <div
        class="my-font-bold"
        style="font-size: 20px; font-weight: 100; color: #585858"
      >
        Filtrado por zona
      </div>
      <div
        class="my-font-bold"
        style="
          font-size: 16px
          font-weight: 100;
          color: #999999;
        "
      >
        Elige como mostrar tu búsqueda
      </div>

      <LocationFormInternal class="q-mt-md" />
    </section>
  </section>
</template>

<style scoped lang="scss">
@import url('./LocationConfigPageInternal.scss');
</style>
