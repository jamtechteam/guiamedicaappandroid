<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';

import { useQuasar, Loading } from 'quasar';

// vuelidate
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import CSelect from 'src/components/CSelect/CSelect.vue';
import CButton from 'src/components/CButton/CButton.vue';

import { useRouter, useRoute } from 'vue-router';

import { useLocationStore } from 'src/stores/locationStore';
import { Notify } from 'quasar';

const locationStore = useLocationStore();

const router = useRouter();
const route = useRoute();

const states = ref(locationStore.states);
const cities = ref([]);

const isFirstLoad = ref(true);

const isLocate = ref(false);

const $q = useQuasar();

const btnSaveLabel = computed(() => {
  // verifico el query de la ruta
  const { unique } = route.query as { unique: string };
  if (unique) {
    return 'Filtrar';
  } else {
    return 'Guardar configuración';
  }
});

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
  Loading.show({
    message: 'Cargando...',
  });
  await locationStore.getAllStatesActives();
  states.value = locationStore.states;
  setDefaultLocation();
};

// funcion para elegir por defecto la ciudad y el estado
// de momento Bolívar y Puerto Ordaz
const setDefaultLocation = async () => {
  const locateLS: any = locationStore.getStorage();

  if (locateLS) {
    Loading.hide();
    return;
  }

  const state: any = states.value.find(
    (state: any) => state.name === 'Bolívar'
  );

  // si encuentra el estado bolivar, entonces busca la ciudad puerto ordaz
  console.log('state', state);
  if (state) {
    locationForm.value.state = state._id;
    const citiesLS: any = await locationStore.getAllCitiesActivesByState(
      locationForm.value.state
    );
    cities.value = citiesLS;
    const city: any = cities.value.find(
      (city: any) => city.name === 'Puerto Ordaz'
    );
    if (city) {
      locationForm.value.city = city._id;
      // setStorageFilter(false);
    }
  }
  Loading.hide();
};

const getConfigLocation = async () => {
  const locateLS: any = locationStore.getStorage();
  if (locateLS) {
    isLocate.value = true;
    const citiesLS: any = await locationStore.getAllCitiesActivesByState(
      locateLS.state
    );
    cities.value = citiesLS;
    locationForm.value = locateLS;
  }
};

const getCitiesByState = async () => {
  const citiesLS: any = await locationStore.getAllCitiesActivesByState(
    locationForm.value.state
  );
  cities.value = citiesLS;

  if (!isFirstLoad.value) {
    locationForm.value.city = citiesLS[0]._id;

    // si selecciona un state con el slug "bolivar" entonces el city por defecto colocar el que tiene el slug "puerto-ordaz"
    const state: any = states.value.find(
      (state: any) => state._id === locationForm.value.state
    );
    if (state.slug === 'bolivar') {
      const city: any = cities.value.find(
        (city: any) => city.slug === 'puerto-ordaz'
      );
      locationForm.value.city = city._id;
    }
  }
  isFirstLoad.value = false;
};

const saveFilter = () => {
  // aqui verifico si el query de la ruta tiene como query unique y home-care
  // si es asi, entonces devuelvo la ruta a la que estaba con el query de la ciudad y el estado
  // si no, entonces devuelvo a la ruta anterior
  const { unique, homeCare } = route.query;

  if (unique && homeCare) {
    // sacar nombre de la ciudad
    const cityName: any = cities.value.find(
      (city: any) => city._id === locationForm.value.city
    );

    const stateName: any = states.value.find(
      (state: any) => state._id === locationForm.value.state
    );

    try {
      if ($q.platform.is.mobile) {
        console.log('mobile', stateName.name, cityName.name);
        window.plugins.OneSignal.sendTags({
          state: stateName.name,
          city: cityName.name,
        });
      }
    } catch (error) {
      console.log(error);
    }

    router.push({
      path: '/services/doctors/home-care',
      query: {
        city: locationForm.value.city,
        cityName: cityName.name,
      },
    });
  } else {
    setStorageFilter();
  }
};

const setStorageFilter = async (isRedirect = true) => {
  // validate
  rules.value.$touch();
  if (rules.value.$invalid) {
    Notify.create({
      message: 'Debes seleccionar un estado y una ciudad',
      color: 'negative',
      position: 'bottom',
    });
    return;
  }
  const cityName: any = cities.value.find(
    (city: any) => city._id === locationForm.value.city
  );

  const stateName: any = states.value.find(
    (state: any) => state._id === locationForm.value.state
  );
  console.log('mobile', stateName.name, cityName.name);
  try {
    if ($q.platform.is.mobile) {
      console.log('mobile', stateName.name, cityName.name);
      window.plugins.OneSignal.sendTags({
        state: stateName.name,
        city: cityName.name,
      });
    }
  } catch (error) {
    console.log(error);
  }

  locationStore.saveStorage(locationForm.value, cityName.name, stateName.name);
  if (isRedirect) router.go(-1);
};

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
          />
        </section>

        <section class="col-12 q-pt-md">
          <c-button
            class="full-width"
            :label="btnSaveLabel"
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
@import url('./LocationForm.scss');
</style>
