<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

import { useRouter } from 'vue-router';

import { Loading, QSpinnerDots as QSpinner } from 'quasar';

import CHeaderBanner from 'src/components/Layout/CHeader/CHeaderBanner/CHeaderBanner.vue';
import CTitle from 'src/components/CTitle/CTitle.vue';
import CCategoriesBanner from 'src/components/CategoriesApp/CCategoriesBanner.vue';
import CardItemDoctor from 'src/components/Doctor/CardItemDoctor/CardItemDoctor.vue';
import CTutorial from 'src/components/Tutorial/CTutorial.vue';
import CPromotionSlider from 'src/components/Promotion/CPromotionSlider/CPromotionSlider.vue';

import { useDoctorStore } from 'src/stores/doctorStore';
import { useLocationStore } from 'src/stores/locationStore';
import { usePromotionStore } from 'src/stores/promotionStore';
import { useHomeStore } from 'src/stores/homeStore';

const doctorStore = useDoctorStore();
const locationStore = useLocationStore();
const promotionStore = usePromotionStore();
const homeStore = useHomeStore();

const router = useRouter();

const doctors = ref(doctorStore.doctors);
const locate = ref<any>(null);
const promotion = ref<any>(null);

const loadeds = ref({
  banner: false,
  doctors: false,
  categoriesApp: false,
});

const dlgTutorial = ref(false);

const getPromotion = async () => {
  await promotionStore.getPromotion();
  promotion.value = promotionStore.promotion;
};

const getDoctorsPremiun = async () => {
  await doctorStore.getDoctors({
    limit: 10,
    offset: 0,
    isEnable: true,
    isPremium: false,
    city: locate.value.city,
  });
  doctors.value = doctorStore.doctors;
  changeLoadedDoctors(true);
};

const handleClickDoctor = (id: string) => {
  router.push(`/doctor/${id}`);
};

const changeLoadedBanner = (isLoaded: boolean) => {
  loadeds.value.banner = isLoaded;
};

const changeLoadedDoctors = (isLoaded: boolean) => {
  loadeds.value.doctors = isLoaded;
};

const changeLoadedCategoriesApp = async (isLoaded: boolean) => {
  // hacer un await para que espere a que se cargue el componente
  loadeds.value.categoriesApp = isLoaded;
};

const handleClickPromotion = () => {
  router.push('/promotion');
};

const validateIsRedirectToPromotionPage = () => {
  if (homeStore.isRedirectPromotion) {
    router.push('/promotion');
  }
};

// watch para escuchar cada vez que cambie el valor de loadeds
watch(
  () => loadeds.value,
  (val) => {
    if (val.banner && val.doctors && val.categoriesApp) {
      Loading.hide();
    }
  },
  { deep: true }
);

onMounted(() => {
  // alert(homeStore.isRedirectPromotion)
  if (!homeStore.isRedirectPromotion) {
    locate.value = locationStore.getStorage();
    if (!locate.value) {
      Loading.show({
        spinner: QSpinner,
        spinnerSize: 70,
        spinnerColor: 'primary',
        backgroundColor: 'white',
        customClass: 'bg-white',
      });
    } else if (locationStore.firstInit) {
      Loading.show({
        spinner: QSpinner,
        spinnerSize: 70,
        spinnerColor: 'primary',
        backgroundColor: 'white',
        customClass: 'bg-white',
      });
      getDoctorsPremiun();
      if (locationStore.firstInit) locationStore.setFirstInit(false);
    } else {
      getDoctorsPremiun();
    }
    getPromotion();
  } else {
    validateIsRedirectToPromotionPage();
  }

});
</script>

<template>
  <q-page class="bg-white home-container">
    <c-header-banner @changeLoadedBanner="changeLoadedBanner" />
    <section class="relative q-px-md">
      <section class="row justify-between items-center q-pt-xs">
        <section class="column">
          <c-title
            title="Bienvenido"
            class="q-pt-sm my-font-bold ls-1"
            font-size="24"
            font-weight="100"
            color="#000000"
            line-height="40"
            style="letter-spacing: 0.25px"
          />
          <c-title
            title="¿Qué estás buscando?"
            class="q-pt-sm ls-1"
            font-size="17"
            line-height="0"
            style="letter-spacing: 0.25px"
            color="#999999"
          />
        </section>
        <q-btn
          @click="dlgTutorial = true"
          label="Ayuda"
          no-caps
          class="text-bold ls-1"
          color="secondary"
          flat
          icon="help_outline"
          dense
          rounded
          size="12px"
        />
      </section>
    </section>

    <section class="q-pt-xs">
      <c-categories-banner
        @changeLoadedCategoriesApp="changeLoadedCategoriesApp"
      />
    </section>

    <!-- Promociones section -->
    <section
      v-if="promotion && promotion.status"
      class="q-pt-sm"
    >
      <section class="column q-px-md">
        <c-title
          title="Promociones"
          class="q-pt-sm my-font-bold ls-1"
          font-size="24"
          font-weight="100"
          color="#000000"
          line-height="40"
          style="letter-spacing: 0.25px"
        />
        <c-title
          title="Descuentos imperdibles"
          class="q-pt-sm ls-1"
          font-size="17"
          line-height="0"
          style="letter-spacing: 0.25px"
          color="#999999"
        />
      </section>

      <section
        class="row q-pt-lg col-12"
      >
        <c-promotion-slider
          class="col-12"
          v-if="promotion"
        />
      </section>
    </section>

    <section
      class="column q-px-md"
      :class="promotion && promotion.status ? '' : 'q-pt-md'"
    >
      <c-title
        title="Recomendados"
        class="q-pt-sm my-font-bold ls-1"
        font-size="24"
        color="#000000"
        line-height="40"
        style="letter-spacing: 0.25px"
        font-weight="100"
      />
      <c-title
        title="Especialistas destacados"
        class="q-pt-sm ls-1"
        font-size="17"
        line-height="0"
        style="letter-spacing: 0.25px"
        color="#999999"
      />
    </section>

    <section
      v-if="doctors.length > 0"
      class="row q-pt-lg q-gutter-y-lg q-px-sm"
    >
      <card-item-doctor
        v-for="doctor in doctors"
        :key="doctor._id"
        v-bind="doctor"
        class="col-12"
        @click="handleClickDoctor(doctor._id)"
      />
    </section>
    <section v-else class="q-pt-lg q-px-md">
      <div
        class="text-left my-font-semibold"
        style="font-weight: 400px; color: #999; font-size: 15.36px"
      >
        No se encontraron doctores destacados.
      </div>
    </section>

    <q-dialog
      v-model="dlgTutorial"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
      persistent
    >
      <c-tutorial />
    </q-dialog>
  </q-page>
</template>

<style scoped lang="scss">
@import url('./HomePage.scss');
</style>
