<script setup lang="ts">
import { Loading } from 'quasar';

import { ref, onMounted, computed } from 'vue';

import { useRoute, useRouter } from 'vue-router';

import CHeaderDinamic from 'src/components/Layout/CHeader/CHeaderDinamic/CHeaderDinamic.vue';
import CTitle from 'src/components/CTitle/CTitle.vue';

import { useDoctorStore } from 'src/stores/doctorStore';
import { useLocationStore } from 'src/stores/locationStore';
import { IDoctor } from 'src/interfaces/IDoctor.interface';

const storeDoctor = useDoctorStore();
const storeLocation = useLocationStore();

const route = useRoute();
const router = useRouter();

const specialtyId = ref<string>(route.params.id as string);

const data = ref<IDoctor[]>([]);

const isLoading = ref(false);

const search = ref('');

const title = 'Doctores';

const cityName = ref<string | null>(null);

const getLocationLS = (): any => {
  return storeLocation.getStorage();
};

const getDoctorsBySpecialtyId = async (done?: any) => {
  isLoading.value = true;
  Loading.show();
  try {
    const { actualFilterCityId } = route.query as {
      actualFilterCityId: string;
    };
    if (actualFilterCityId) {
      await storeDoctor.getDoctorBySpecialtyId(specialtyId.value, actualFilterCityId);
    } else {
      const { city } = getLocationLS();
      await storeDoctor.getDoctorBySpecialtyId(specialtyId.value, city);
    }
    data.value = storeDoctor.doctors;
  } catch (error) {
    console.log(error);
  } finally {
    done && done();
    isLoading.value = false;
    Loading.hide();
  }
};

const searchDoctor = computed(() => {
  const dataCopy = [...data.value];

  // Ordenar por nombre y apellido alfabéticamente
  const sortedData = dataCopy.sort((a, b) => {
    const fullNameA = `${a.name} ${a.lastName}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const fullNameB = `${b.name} ${b.lastName}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return fullNameA.localeCompare(fullNameB);
  });

  if (search.value.length === 0) {
    return sortedData;
  }

  return sortedData.filter((doctor) => {
    const fullName = `${doctor.name} ${doctor.lastName}`;
    const normalizedFullName = fullName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const normalizedSearch = search.value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    return normalizedFullName
      .toLowerCase()
      .includes(normalizedSearch.toLowerCase());
  });
});

const handleClickItem = (id: string) => {
  router.push('/doctor/' + id);
};

const goFilterPageInternal = () => {
  const location = storeLocation.getStorage()
  const { actualFilterCityId } = route.query as {
    actualFilterCityId: string;
  };

  if (actualFilterCityId) location.city = actualFilterCityId;

  // obtener ruta actual
  const currentRoute = router.currentRoute.value;

  console.log('currentRoute', currentRoute);

  router.push({
    name: 'location-config-internal',
    query: {
      queryOldRoute: JSON.stringify(currentRoute.query),
      oldRoutePath: currentRoute.path,
      actualFilterCityId: location.city
    },
  });
};

onMounted(() => {
  getDoctorsBySpecialtyId();
  const { actualFilterCityName } = route.query as {
    actualFilterCityName: string;
  };

  if (actualFilterCityName) {
    cityName.value = actualFilterCityName;
  } else {
    cityName.value = storeLocation.getCityNameStorage();
  }
});
</script>
<template>
  <q-page style="padding-bottom: 100px">
    <c-header-dinamic class="c-header-dinamic-verde">
      <template #content>
        <section class="flex flex-center q-py-md position-relative">
          <q-btn
            icon="arrow_back"
            color="white"
            flat
            @click="router.go(-1)"
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

          <section class="row q-pt-lg full-width row q-px-lg q-pb-sm">
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

    <section class="q-px-md q-pt-sm row">
      <c-title
        :title="title"
        class="my-font-bold col-12"
        font-size="18.2"
        color="#585858"
        line-height="30"
        font-weight="100"
        style="letter-spacing: 0.25px"
      />
      <div
        @click="goFilterPageInternal"
        class="q-px-md q-mt-sm row items-center location-verde"
        v-ripple
        clickable
      >
        <q-icon name="near_me" class="q-pr-xs" />
        <span class="fs-14" v-if="cityName"> {{ cityName }} </span>
        <q-skeleton v-else type="rect" size="10px" class="col-12" />
      </div>
    </section>
    <q-pull-to-refresh
      v-if="data.length > 0"
      @refresh="getDoctorsBySpecialtyId"
      class="row q-pt-md window-width"
    >
      <q-list class="col-12 window-width" v-if="searchDoctor.length > 0">
        <div class="full-width" v-for="n in searchDoctor" :key="n._id">
          <q-item
            @click="handleClickItem(n._id)"
            v-ripple
            clickable
            class="full-width col-12"
          >
            <q-item-section avatar>
              <q-avatar>
                <q-icon name="img:doctor2.svg" size="40px" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label
                class="my-font-semibold"
                lines="1"
                style="
                  font-size: 15.4px;
                  font-weight: 800;
                  letter-spacing: 0.2px;
                  color: #000000;
                "
              >
                {{ n.name }} {{ n.lastName }}
              </q-item-label>
              <q-item-label
                style="font-size: 14px; font-weight: 100; color: #666666"
              >
                {{ n.description }}
              </q-item-label>
            </q-item-section>
            <q-item-section side center>
              <q-icon name="chevron_right" color="grey-5" />
            </q-item-section>
          </q-item>
          <q-separator
            spaced
            inset
            class="bg-grey-3"
            style="margin-left: 70px"
          />
        </div>
      </q-list>
      <section
        v-else
        class="text-left fs-16 q-pt-sm my-font-semibold q-px-md"
        style="font-weight: 400px; color: #999; font-size: 15.36px"
      >
        No se encontraron resultados para esta búsqueda.
      </section>
    </q-pull-to-refresh>
    <section
      v-else
      class="text-left fs-16 q-px-md q-pt-md my-font-semibold q-px-md"
      style="font-weight: 400px; color: #999; font-size: 15.36px"
    >
      No hay resultados disponibles en esta ciudad.
    </section>
  </q-page>
</template>

<style scoped lang="scss">
@import url('./SpecialtyDoctorsPage.scss');
</style>
