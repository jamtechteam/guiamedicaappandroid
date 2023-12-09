<script setup lang="ts">
import { ref } from 'vue';

const slide = ref(1);
</script>
<template>
  <q-card class="bg-red">
    <q-carousel
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      navigation
      control-color="primary"
      class="bg-white text-black fit"
    >
      <q-carousel-slide :name="1" class="column no-wrap flex-center q-px-lg">
        <div class="tuto-img-1" />
        <div class="text-bold text-h6">Como usar la aplicación</div>
        <div
          class="q-pt-sm text-caption text-grey-9 my-font-light q-px-lg text-center subtitle-text"
        >
          Nuestra aplicación cuenta con unas funcionalidades muy útiles para
          agilizar tu búsqueda
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap flex-center q-px-lg">
        <div class="tuto-img-2" />
        <div class="text-bold text-h6">Agregar a favoritos</div>
        <div
          class="q-pt-sm text-caption text-grey-9 my-font-light q-px-lg text-center subtitle-text"
        >
          Puedes agregar un médico como favorito para que no pierdas sus datos
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="column no-wrap flex-center q-px-lg">
        <div class="tuto-img-3" />
        <div class="text-bold text-h6">Filtrado por zonas</div>
        <div
          class="q-pt-sm text-caption text-grey-9 my-font-light q-px-lg text-center subtitle-text"
        >
          Nuestro directorio posee un filtrado por zonas, ya sea si eres de
          Puerto Ordaz, de Upata u otro lugar
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="4" class="column no-wrap flex-center q-px-lg q-pb-sm">
        <div style="font-size: 21px;font-weight: 700px;" class="text-bold">¡Listo!</div>
        <div
          class="q-pt-sm text-caption text-grey-9 my-font-light q-px-lg text-center q-pb-lg subtitle-text"
        >
          Ya puedes empezar a utilizar el directorio de la Guía Médica de
          Venezuela
        </div>

        <q-btn
          label="Finalizar"
          no-caps
          v-close-popup
          style="background: #1AB51A;color: #FFF;font-size: 16px;border-radius: 64px;padding-start: 26px;padding-end: 26px;"
        />
      </q-carousel-slide>
    </q-carousel>
  </q-card>
</template>

<style scoped lang="scss">
@import url('./CTutorial.scss');
</style>
