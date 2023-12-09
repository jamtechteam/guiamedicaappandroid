<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { useBannerStore } from 'src/stores/bannerStore';
import { useLocationStore } from 'src/stores/locationStore';

import { useRouter } from 'vue-router';

import { IBanner } from 'src/interfaces/IBanner.interface';

// emit - changeLoadedBanner
const emit = defineEmits(['changeLoadedBanner']);

const router = useRouter();

const bannerStore = useBannerStore();
const locationStore = useLocationStore();

const slide = ref(0);

const banners = ref(bannerStore.banners);

const selectedBanner = ref<IBanner | null>(null);

const showBannerDlg = ref(false);

const isLoading = ref(false);

const getBanners = async () => {
  isLoading.value = true;
  try {
    const locate: any = locationStore.getStorage();
    await bannerStore.getBanners(locate.state);
    banners.value = bannerStore.banners;
  } catch {
    console.log('Error al obtener los banners');
  } finally {
    isLoading.value = false;
    emit('changeLoadedBanner', true);
  }
};

const handleClickBanner = (banner: IBanner) => {
  selectedBanner.value = banner;
  showBannerDlg.value = true;
};

const handleClickPhone = (phone: string) => {
  // si al principio tiene 0, entonces abro con tel: y si no es porque es whatsapp y abro con https://wa.me/ con un mensaje que diga "¡Hola! Quiero hacer una consulta - vía Guía Médica de Venezuela App"
  if (phone[0] === '0') {
    window.open(`tel:${phone}`, '_blank');
  } else {
    window.open(
      `https://wa.me/${phone}?text=¡Hola!%20Quiero%20hacer%20una%20consulta%20-%20vía%20Guía%20Médica%20de%20Venezuela%20App`,
      '_blank'
    );
  }
};

const handleClickUrl = (url: string) => {
  window.open(url, '_blank');
};

onMounted(() => {
  getBanners();
});
</script>

<template>
  <section class="header-banner-container q-pb-lg">
    <section class="flex flex-center q-pt-md">
      <q-btn
        @click="router.push('/configuration/location')"
        icon="o_location_on"
        color="white"
        flat
        class="button-right-back"
      />
      <img
        src="logo-light.svg"
        alt="logo_guiamedica1"
        class="logo-header-banner"
      />
    </section>

    <section v-if="banners.length > 0" class="row q-px-md q-pt-lg">
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
        <div class="q-px-md row justify-between q-pt-md" style="padding-bottom: 15px">
          <q-btn
            v-if="selectedBanner?.url"
            icon="img:iconos/instagram_white.svg"
            color="white"
            label="Instagram"
            style="font-size: 14px; letter-spacing: 0.84px"
            class="my-font-bold"
            flat
            round
            dense
            @click="handleClickUrl(selectedBanner.url)"
          />
          <q-space />
          <q-btn
            v-if="selectedBanner?.phone"
            icon="phone"
            color="white"
            label="Teléfono"
            style="font-size: 14px; letter-spacing: 0.84px"
            class="my-font-bold"
            flat
            round
            dense
            @click="handleClickPhone(selectedBanner.phone)"
          />
        </div>
      </q-card>
    </q-dialog>
  </section>
</template>

<style scoped lang="scss">
@import url('./CHeaderBanner.scss');
</style>
