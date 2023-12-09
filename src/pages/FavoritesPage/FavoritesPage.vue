<script setup lang="ts">
import { computed, onMounted } from 'vue';

import CTitle from 'src/components/CTitle/CTitle.vue';
import CardItemDoctor from 'src/components/Doctor/CardItemDoctor/CardItemDoctor.vue';

import { useRouter } from 'vue-router';

import { useFavoriteDoctorStore } from 'src/stores/favoriteDoctorStore';

const favoriteDoctorStore = useFavoriteDoctorStore();

const router = useRouter();

const doctors = computed(() => favoriteDoctorStore.favorites);

const handleClickDoctor = (id: string) => {
  router.push(`/doctor/${id}`);
};

onMounted(() => {
  favoriteDoctorStore.getStorage();
});
</script>
<template>
  <q-page class="column q-pa-md bg-white">
    <section class="q-pb-sm">
      <c-title
        title="Favoritos"
        class="q-pt-sm my-font-bold ls-1"
        font-size="24"
        color="#000000"
        line-height="40"
        style="letter-spacing: 0.25px"
        font-weight="100"
      />
      <c-title
        title="Doctores guardados"
        class="q-pt-sm ls-1"
        font-size="17"
        line-height="0"
        style="letter-spacing: 0.25px"
        color="#999999"
      />
    </section>

    <section class="row q-pt-lg q-gutter-y-lg" v-if="doctors.length > 0">
      <card-item-doctor
        v-for="doctor in doctors"
        :key="doctor._id"
        v-bind="doctor"
        class="col-12"
        @click="handleClickDoctor(doctor._id)"
      />
    </section>
    <section v-else class="" style="padding-top: 20px">
      <div
        class="text-left my-font-semibold"
        style="font-weight: 400px; color: #999; font-size: 15.36px"
      >
        No tienes doctores agregados en este momento.
      </div>
    </section>
  </q-page>
</template>

<style scoped lang="scss">
@import url('./FavoritesPage.scss');
</style>
