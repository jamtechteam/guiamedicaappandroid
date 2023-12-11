<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Loading } from 'quasar';

import CHeaderDinamic from 'src/components/Layout/CHeader/CHeaderDinamic/CHeaderDinamic.vue';
import CTitle from 'src/components/CTitle/CTitle.vue';
import CardItemDoctor from 'src/components/Doctor/CardItemDoctor/CardItemDoctor.vue';

import { useRouter, useRoute } from 'vue-router';

import { useDoctorStore } from 'src/stores/doctorStore';
import { useLocationStore } from 'src/stores/locationStore';

const router = useRouter();
const route = useRoute();

const doctorStore = useDoctorStore();
const locationStore = useLocationStore();

const isAllCities = ref(true);

const data = ref<any[]>([]);

const isLoading = ref(false);

const search = ref('');

const locationName = computed(() => {
  const cityName = locationStore.getCityNameStorage();
  const stateName = locationStore.getStateNameStorage();
  if (isAllCities.value) {
    return `${stateName} - Todas las ciudades`;
  } else {
    const {
      actualFilterCityName,
    } = route.query as { actualFilterCityName: string };
    if (actualFilterCityName) {
      return actualFilterCityName;
    }
  }
  return cityName ? cityName : '';
});

const searchData = computed(() => {
  const dataCopy = [...data.value];

  const sortedData = dataCopy.sort((a: any, b: any) => {
    const nameA = `${a.name} ${a.lastName}`;
    const nameB = `${b.name} ${b.lastName}`;

    return nameA.localeCompare(nameB);
  });

  if (search.value.length === 0) {
    return sortedData;
  }

  return sortedData.filter((doctor) => {
    // uno las propiedades name y lastName para poder hacer la busqueda
    const fullName = `${doctor.name} ${doctor.lastName}`;
    const normalizedFullName = fullName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    return normalizedFullName.toLowerCase().includes(
      search.value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    );
  });
});


const getDoctorHomeCare = async () => {
  Loading.show();
  isLoading.value = true;
  const locate: any = locationStore.getStorage();
  const state = locate.state;
  try {
    let res: any;
    if (isAllCities.value) {
      res = await doctorStore.getDoctorsHomeCare(null, state);
    } else {
      const { actualFilterCityId } = route.query as {
        actualFilterCityId: string;
      };
      res = await doctorStore.getDoctorsHomeCare(actualFilterCityId, state);
    }
    data.value = res;
  } catch (error) {
    console.log(error);
  } finally {
    Loading.hide();
    isLoading.value = false;
  }
};

const handleClickDoctor = (id: string) => {
  router.push('/doctor/' + id);
};

const goFilterPageInternal = () => {
  const location = locationStore.getStorage()
  const { actualFilterCityId } = route.query as {
    actualFilterCityId: string;
  };

  if (actualFilterCityId) location.city = actualFilterCityId;

  // obtener ruta actual
  const currentRoute = router.currentRoute.value;

  router.push({
    name: 'location-config-internal',
    query: {
      queryOldRoute: JSON.stringify(currentRoute.query),
      oldRouteName: currentRoute.name,
      actualFilterCityId: location.city
    },
  });
};


onMounted(() => {
  if (route.query.actualFilterCityId) {
    isAllCities.value = false;
  }
  getDoctorHomeCare();
});
</script>

<template>
  <q-page class="bg-white" style="padding-bottom: 100px">
    <c-header-dinamic class="header-dinamic-container-2">
      <template #content>
        <section class="flex flex-center q-py-md column">
          <q-btn
            to="/services"
            icon="arrow_back"
            color="white"
            flat
            class="button-left-back"
          />
          <q-btn
            @click="goFilterPageInternal"
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

          <section class="row q-pt-lg full-width row q-px-lg">
            <q-input
              v-model="search"
              placeholder="Buscar por nombre"
              class="col-12 c-search-style"
              borderless
              dense
              :input-style="{
                color: '#666',
              }"
            >
              <template #prepend>
                <q-icon name="search" />
              </template>
              <template #append v-if="search.length > 0">
                <q-btn
                  icon="close"
                  @click="search = ''"
                  dense
                  flat
                  rounded
                  color="black"
                />
              </template>
            </q-input>
          </section>
        </section>
      </template>
    </c-header-dinamic>

    <section class="q-px-md q-pt-sm">
      <c-title
        title="Atención a domicilio"
        class="my-font-bold"
        font-size="18.2"
        color="#585858"
        line-height="30"
        font-weight="100"
        style="letter-spacing: 0.25px"
      />
    </section>

    <section class="q-px-md q-pt-xs row">
      <div
        @click="goFilterPageInternal"
        class="q-px-md q-mt-sm row items-center location-verde justify-between"
        v-ripple
      >
        <q-icon name="near_me" class="q-pr-xs" size="20px" />
        <span class="fs-14" v-if="locationName"> {{ locationName }} </span>
        <q-skeleton v-else type="rect" size="10px" class="col-12" />
      </div>
    </section>

    <section v-if="isLoading" class="q-pt-md q-px-sm q-gutter-y-md">
      <section v-for="n in 6" :key="n" class="row items-center">
        <q-skeleton type="circle" />
        <div class="col-10 row q-pl-md">
          <q-skeleton type="text" class="col-8" />
          <q-skeleton type="text" class="col-12" />
        </div>
      </section>
    </section>
    <section
      class="row q-pt-xs q-gutter-y-lg q-px-md"
      v-else-if="data && data.length > 0"
    >
      <section class="col-12 row q-gutter-y-lg" v-if="searchData.length > 0">
        <card-item-doctor
          v-for="doctor in searchData"
          :key="doctor._id"
          v-bind="doctor"
          class="col-12"
          @click="handleClickDoctor(doctor._id)"
        />
      </section>
      <section
        v-else
        class="text-left fs-16 my-font-semibold q-px-md"
        style="font-weight: 400px; color: #999; font-size: 15.36px"
      >
        No se encontraron resultados para su búsqueda
      </section>
    </section>
    <section v-else class="q-pt-lg q-px-sm">
      <div
        class="text-left fs-16 my-font-semibold q-px-md"
        style="font-weight: 400px; color: #999; font-size: 15.36px"
      >
        No se encontraron resultados para su búsqueda
      </div>
    </section>
  </q-page>
</template>

<style scoped lang="scss">
@import url('./HomeCarePage.scss');
</style>
