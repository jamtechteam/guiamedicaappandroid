<script setup lang="ts">
import { ref, onMounted } from 'vue';

import CTitle from 'src/components/CTitle/CTitle.vue';
import CardItemDoctor from 'src/components/Doctor/CardItemDoctor/CardItemDoctor.vue';
import CHeaderDinamic from 'src/components/Layout/CHeader/CHeaderDinamic/CHeaderDinamic.vue';

import { useRouter } from 'vue-router';

import { Loading } from 'quasar';

import { useLocationStore } from 'src/stores/locationStore';
import { useDoctorStore } from 'src/stores/doctorStore';
import { useHomeStore } from 'src/stores/homeStore';

const doctorStore = useDoctorStore();
const locationStore = useLocationStore();
const homeStore = useHomeStore();

const router = useRouter();

const doctors = ref(doctorStore.doctors);

const isLoading = ref(false);

const handleClickDoctor = (id: string) => {
  router.push(`/doctor/${id}`);
};

const getPromotionDoctors = async () => {
  isLoading.value = true;
  try {
    const locate: any = locationStore.getStorage();
    await doctorStore.promotionDoctors(locate.city);
    doctors.value = doctorStore.doctors;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  router.go(-1);
};

onMounted(() => {
  Loading.hide();
  getPromotionDoctors();

  if (homeStore.isRedirectPromotion) {
    homeStore.changeRedirectPromotion();
  }
});
</script>
<template>
  <q-page class="column bg-white">
    <c-header-dinamic classes="header-dinamic-container-2">
      <template #content>
        <section class="btn-back">
          <q-btn icon="arrow_back" color="white" flat @click="goBack" rounded />
        </section>
        <section class="flex flex-center q-py-md">
          <img
            src="logo-light.svg"
            alt="logo_guiamedica1"
            class="logo-header-banner"
          />
        </section>
      </template>
    </c-header-dinamic>
    <section class="q-px-md q-pt-md q-pb-sm">
      <c-title
        title="Promociones"
        class="q-pt-sm my-font-bold ls-1"
        font-size="24"
        color="#000000"
        line-height="40"
        style="letter-spacing: 0.25px; font-weight: 100"
      />
      <c-title
        title="Especialistas con descuentos"
        class="q-pt-sm ls-1"
        font-size="17"
        line-height="0"
        color="#999999"
      />
    </section>

    <section v-if="isLoading" class="q-pt-lg q-px-md q-gutter-y-md">
      <section v-for="n in 6" :key="n" class="row items-center">
        <q-skeleton type="circle" />
        <div class="col-10 row q-pl-md">
          <q-skeleton type="text" class="col-8" />
          <q-skeleton type="text" class="col-12" />
        </div>
      </section>
    </section>
    <section
      class="row q-pt-lg q-gutter-y-lg q-px-md"
      style="padding-bottom: 100px"
      v-else-if="doctors.length > 0"
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
  </q-page>
</template>

<style scoped lang="scss">
@import url('./PromotionPage.scss');
</style>
