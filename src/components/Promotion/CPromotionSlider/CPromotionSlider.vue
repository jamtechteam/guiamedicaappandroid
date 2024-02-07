<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { useRouter } from 'vue-router';

import { usePromotionStore } from 'src/stores/promotionStore';

// emit - changeLoadedBanner
const emit = defineEmits(['changeLoadedBanner']);

const router = useRouter();

const promotionStore = usePromotionStore();

const slide = ref(0);

const banners = ref(promotionStore.promotionSlider);

const selectedBanner = ref<any | null>(null);

const showBannerDlg = ref(false);

const isLoading = ref(false);

const handleClickBanner = (banner: any) => {
  if (banner.type === 'doctor') {
    selectedBanner.value = banner;
    showBannerDlg.value = true;
  } else {
    router.push(`consulting-room/${banner.perfil_id}`);
  }
};

const handleClickGoPerfil = (perfil_id: string) => {
  router.push(`/doctor/${perfil_id}`);
};

const handleClickUrl = (url: string) => {
  window.open(url, '_blank');
};
</script>

<template>
  <section class="header-banner-container">
    <section v-if="banners && banners.length > 0" class="row">
      <q-carousel
        v-model="slide"
        class="bg-transparent text-white rounded-borders col-12 carousel-header-banner"
        transition-prev="scale"
        transition-next="scale"
        height="200px"
        swipeable
        animated
        autoplay
      >
        <q-carousel-slide
          v-for="(banner, index) in banners"
          :key="index"
          :name="index"
          @click="handleClickBanner(banner)"
          style="
            position: relative;
            padding: none !important;
            margin: none !important;
          "
        >
          <div
            style="
              position: absolute;
              padding: none !important;
              margin: none !important;
              top: 0;
              left: 0;
            "
            class="full-width full-height"
          >
            <q-img class="fit" :src="banner.main_image" fit="fill" />
          </div>
        </q-carousel-slide>
      </q-carousel>

      <section
        class="row full-width items-center justify-center q-gutter-x-sm q-pt-sm"
        style="height: 10px"
      >
        <div
          v-for="n in banners.length"
          :key="n"
          class="circle-control-carousel"
          :class="slide === n - 1 ? 'active-carousel-control' : ''"
        />
      </section>
    </section>

    <q-dialog
      v-model="showBannerDlg"
      persistent
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-black column justify-start q-py-sm">
        <div class="col-1 q-pa-sm q-px-md">
          <q-btn
            icon="close"
            color="white"
            label="Cerrar"
            style="font-size: 14px; letter-spacing: 0.84px"
            class="my-font-bold"
            flat
            round
            dense
            @click="showBannerDlg = false"
          />
        </div>
        <img
          :src="selectedBanner?.internal_image"
          class="col"
          style="object-fit: contain;"
        />
        <div class="q-px-md row justify-end q-pt-md" style="padding-bottom: 15px">
          <q-btn
            icon="person"
            color="white"
            label="Ir al perfil"
            style="font-size: 14px; letter-spacing: 0.84px"
            class="my-font-bold"
            flat
            dense
            @click="handleClickGoPerfil(selectedBanner.perfil_id)"
          />
        </div>
      </q-card>
    </q-dialog>
  </section>
</template>

<style scoped lang="scss">
@import url('./CPromotionSlider.scss');
</style>
