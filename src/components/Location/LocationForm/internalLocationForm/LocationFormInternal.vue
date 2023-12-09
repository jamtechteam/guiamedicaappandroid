<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

import { useQuasar, Loading } from 'quasar';

// vuelidate
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import CSelect from 'src/components/CSelect/CSelect.vue';
import CButton from 'src/components/CButton/CButton.vue';

import { useRouter, useRoute } from 'vue-router';

import { useLocationStore } from 'src/stores/locationStore';

const locationStore = useLocationStore();

const router = useRouter();
const route = useRoute();

const states = ref(locationStore.states);
const cities = ref([]);

const isLocate = ref(false);

const actualFilterCityId = ref<string | null>(null);

const $q = useQuasar();

const locationForm = ref<any>({
  state: '',
  city: '',
});

// rules
const rules = useVuelidate(
  {
    state: { required },
    city: { required },
  },
  locationForm
);

const getAllStates = async () => {
  await locationStore.getAllStatesActives();
  states.value = locationStore.states;
};

const getConfigLocation = async () => {
  const locateLS: any = locationStore.getStorage();
  if (locateLS) {
    isLocate.value = true;
    Loading.show({
      message: 'Cargando...',
    });
    const citiesLS: any = await locationStore.getAllCitiesActivesByState(
      locateLS.state
    );
    Loading.hide();
    cities.value = citiesLS;
    locationForm.value.city = actualFilterCityId.value
    locationForm.value.state = locateLS.state;
  }
};

const getCitiesByState = async () => {
  const citiesLS: any = await locationStore.getAllCitiesActivesByState(
    locationForm.value.state
  );
  cities.value = citiesLS;
};

const saveFilter = async () => {
  console.log('saveFilter');

  const oldQuery = JSON.parse(route.query.queryOldRoute)
  const oldRouteName = route.query.oldRouteName

  console.log('oldQuery', oldQuery);
  console.log('oldRouteName', oldRouteName);

  const newQuery = {
    ...oldQuery,
    actualFilterCityId: locationForm.value.city,
    actualFilterCityName: cities.value.find(
      (city: any) => city._id === locationForm.value.city
    ).name,
  };

  console.log('newQuery', newQuery);
  if (!oldRouteName) {
    const oldRoutePath = route.query.oldRoutePath
    router.push({
      path: oldRoutePath,
      query: newQuery,
    });
  } else {
    router.push({
      name: oldRouteName,
      query: newQuery,
    });
  }

}
// watch locationForm.state
watch(
  () => locationForm.value.state,
  (stateVal: string) => {
    if (!isLocate.value) {
      locationForm.value.city = '';
    }
    isLocate.value = false;
    getCitiesByState();
  }
);

onMounted(async () => {
  console.log('mounted', route.query);
  actualFilterCityId.value = route.query.actualFilterCityId as string;
  getAllStates();
  await getConfigLocation();
});
</script>
<template>
  <q-card class="location-form-container">
    <q-card-section>
      <q-form class="row">
        <section class="col-12">
          <c-select
            v-model="locationForm.state"
            label-title="Estado"
            label-title-class="text-secondary text-bold text-subtitle1"
            :options="states"
            class="q-mb-md"
            option-label="name"
            option-value="_id"
            :error="rules.state.$error"
            error-message="Este campo es requerido"
            @blur="rules.state.$touch()"
            disabled
          />
        </section>

        <section class="col-12">
          <c-select
            v-model="locationForm.city"
            label-title="Ciudad"
            label-title-class="text-secondary text-bold text-subtitle1"
            :options="cities"
            class="q-mb-md"
            option-label="name"
            option-value="_id"
            behavior="menu"
            :error="rules.city.$error"
            error-message="Este campo es requerido"
            @blur="rules.city.$touch()"
          />
        </section>

        <section class="col-12 q-pt-md">
          <c-button
            class="full-width"
            label="Filtrar"
            class-btn="rounded-button-component-locate text-uppercase text-bold my-font-semibold ls-1"
            @click="saveFilter"
            colorHex="00ad00"
          />
        </section>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
@import url('./LocationFormInternal.scss');
</style>
