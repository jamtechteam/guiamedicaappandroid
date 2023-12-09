<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

import { useRoute, useRouter } from 'vue-router';

import CHeaderDinamic from 'src/components/Layout/CHeader/CHeaderDinamic/CHeaderDinamic.vue';
import CSkeletonList from 'src/components/CSkeleton/CSkeletonList/CSkeletonList.vue';
import CTitle from 'src/components/CTitle/CTitle.vue';

import { useCategoryAppStore } from 'src/stores/categoryAppStore';
import { useLocationStore } from 'src/stores/locationStore';

const storeCategory = useCategoryAppStore();
const storeLocation = useLocationStore();

const route = useRoute();
const router = useRouter();

// query
const { title, secondary_image, category_id } = route.query as {
  title: string;
  secondary_image: string;
  category_id: string;
};

const data = ref<any[]>([]);

const isLoading = ref(false);

const search = ref('');

const cityName = ref<string | null>(null);

const getLocationLS = (): any => {
  return storeLocation.getStorage();
};

const getCategoryById = async (done?: any) => {
  isLoading.value = true;
  try {
    const { actualFilterCityId } = route.query as {
      actualFilterCityId: string;
    };

    if (actualFilterCityId) {
      await storeCategory.getCategoriesById(category_id, actualFilterCityId);
    } else {
      const { city } = getLocationLS();
      await storeCategory.getCategoriesById(category_id, city);
    }
    data.value = storeCategory.categoriesList;
  } catch (error) {
    console.log(error);
  } finally {
    done && done();
    isLoading.value = false;
  }
};

const categorySearch = computed(() => {
  const dataCopy = [...data.value];

  const sortedData = dataCopy.sort((a: any, b: any) => {
    const nameA = a.typeCategoryApp === "doctor" ? `${a.name} ${a.lastName}` : a.name;
    const nameB = b.typeCategoryApp === "doctor" ? `${b.name} ${b.lastName}` : b.name;

    return nameA.localeCompare(nameB);
  });

  if (search.value.length === 0) {
    return sortedData;
  }

  return sortedData.filter((category: any) => {
    if (category.typeCategoryApp === 'doctor') {
      const fullName = `${category.name} ${category.lastName}`;
      const normalizedFullName = fullName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      return normalizedFullName.toLowerCase().includes(
        search.value
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
      );
    }

    const normalizedName = category.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    return normalizedName.toLowerCase().includes(
      search.value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    );
  });
});

// computed para verificar si en cada registro la descripcion
// la primera posicion es mayor a 0
const hasDoctorByDescription = computed(() => {
  // recorro o verifico los datos de cada registro con un filter
  // ya que en cada registro tiene la propiedad description
  // por lo tanto es un string, y viene tipo asi "0 doctores", "1 doctores", "2 doctores"
  // entonces con el split separo el string y obtengo el primer valor
  // si por lo menos uno de los registros tiene un valor mayor a 0
  // entonces retorno true
  if (data.value.length > 0) {

    const { title } = route.query as {
      title: string;
    };

    if (title === 'Especialidades') {
      const hasDoctor = data.value.filter((item: any) => {
        const description = item.description.split(' ');
        return parseInt(description[0]) > 0;
      });

      if (hasDoctor.length > 0) {
        return true;
      }

    } else {
      return true;
    }
  }

  return false;
});


const colorPage = computed(() => {
  if (data.value.length > 0) {
    return data.value[0].colorCategory;
  }

  return 'verde';
});

const styleHeader = computed(() => {
  const styleGreen = {
    background:
      'linear-gradient(180deg, rgba(1, 175, 0, .8) 20%, rgba(179, 219, 0, .8) 100%), url("bgDoctor.svg") bottom repeat',
    height: '204.20px',
  };

  const styleBlue = {
    background:
      'linear-gradient(180deg, rgba(14, 67, 150, .85) 20%, rgba(46, 127, 210, .85) 100%), url("bgDoctor.svg") bottom repeat',
    height: '204.20px',
  };

  if (data.value.length > 0) {
    if (data.value[0].colorCategory === 'azul') {
      return styleBlue;
    } else {
      return styleGreen;
    }
  }

  return styleGreen;
});

const typePage = computed(() => {
  if (data.value.length > 0) {
    return data.value[0].typeCategoryApp;
  }

  return null;
});

const handleClickItem = (item: any) => {
  if (typePage.value === 'doctor') {
    router.push('/doctor/' + item._id);
  }

  if (typePage.value === 'specialty') {
    const {
      actualFilterCityId,
      actualFilterCityName,
    } = route.query as {
      actualFilterCityId: string;
      actualFilterCityName: string;
    };

    if (actualFilterCityId) {
      router.push({
        path: `/categories/specialty/${item._id}/doctors`,
        query: {
          actualFilterCityId,
          actualFilterCityName,
        },
      });
    } else {
      router.push({
        path: `/categories/specialty/${item._id}/doctors`,
      });
    }
  }

  if (typePage.value === 'specialtyCenter') {
    router.push(`/consulting-room/${item._id}`);
  }
};

const goFilterPageInternal = () => {
  const location = storeLocation.getStorage()
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

onMounted(async () => {
  await getCategoryById();

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
  <q-page class="q-pb-xl">
    <c-header-dinamic :style="styleHeader">
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
        class="q-px-md q-mt-sm row items-center"
        :class="`location-${colorPage}`"
        v-ripple
      >
        <q-icon name="near_me" class="q-pr-xs" size="20px" />
        <span class="fs-14" v-if="cityName"> {{ cityName }} </span>
        <q-skeleton v-else type="rect" size="10px" class="col-12" />
      </div>
    </section>
    <section v-if="isLoading" class="q-pt-md q-px-sm q-gutter-y-md">
      <c-skeleton-list />
    </section>
    <q-pull-to-refresh
      v-else-if="hasDoctorByDescription > 0 && !isLoading"
      @refresh="getCategoryById"
      class="row q-pt-sm window-width"
    >
      <q-list class="col-12 window-width" v-if="categorySearch.length > 0">
        <div v-for="n in categorySearch" :key="n" class="full-width">
          <q-item
            v-if="n.description[0] !== '0'"
            @click="handleClickItem(n)"
            v-ripple
            clickable
            class="full-width"
          >
            <q-item-section avatar>
              <q-avatar class="q-mt-xs">
                <img :src="secondary_image" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label
                class="my-font-semibold"
                style="
                  font-size: 15.4px;
                  font-weight: 800;
                  letter-spacing: 0.2px;
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
              <q-icon name="chevron_right" color="grey-4" />
            </q-item-section>
          </q-item>
          <q-separator
            spaced
            v-if="n.description[0] !== '0'"
            inset
            class="bg-grey-3"
            style="margin-left: 70px; margin-top: 6px"
          />
        </div>
      </q-list>
      <section
        v-else
        class="q-pt-md my-font-semibold q-px-md"
        style="font-weight: 400px; color: #999; font-size: 15.36px"
      >
        No se encontraron resultados para esta búsqueda.
      </section>
    </q-pull-to-refresh>
    <section
      v-else
      class="q-pt-md my-font-semibold q-px-md"
      style="font-weight: 400px; color: #999; font-size: 15.36px"
    >
      No hay resultados disponibles en esta ciudad.
    </section>
  </q-page>
</template>

<style scoped lang="scss">
@import url('./CategoriesPage.scss');
</style>
