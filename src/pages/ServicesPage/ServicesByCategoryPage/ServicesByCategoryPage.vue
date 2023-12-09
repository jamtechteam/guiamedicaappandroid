<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

import CHeaderDinamic from 'src/components/Layout/CHeader/CHeaderDinamic/CHeaderDinamic.vue';
import CTitle from 'src/components/CTitle/CTitle.vue';
import CService from 'src/components/Services/CService.vue';
import CSkeletonList from 'src/components/CSkeleton/CSkeletonList/CSkeletonList.vue';

import { useServiceStore } from 'src/stores/serviceStore';

const serviceStore = useServiceStore();

const route = useRoute();

const data = ref<any[]>([]);

const isLoading = ref(false);

const search = ref('');

const searchData = computed(() => {
  const dataCopy = [...data.value];

  // ordenar por name alfabeticamente
  const sortedData = dataCopy.sort((a: any, b: any) => {
    const nameA = a.name;
    const nameB = b.name;

    return nameA.localeCompare(nameB);
  });

  if (search.value.length === 0) {
    return sortedData;
  }

  // retornar solo los que coincidan con la busqueda
  // y no tomar los espacios en blanco ni acentos
  return sortedData.filter((service) => {
    const normalizedServiceName = service.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    const normalizedSearch = search.value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    return normalizedServiceName.includes(normalizedSearch);
  });
});

const serviceName = computed(() => {
  // por la ruta (query) recibo el nombre de la categoria
  const { categoryName } = route.query;
  return categoryName ? categoryName : 'Categoria Desconocida';
});

const getData = async () => {
  isLoading.value = true;
  try {
    const categoryId = route.params.id;
    console.log(categoryId, 'categoryId');
    const res: any = await serviceStore.getServicesByCategoryId(categoryId);
    console.log(res, 'res');
    data.value = res;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getData();
});
</script>

<template>
  <q-page style="padding-bottom: 100px">
    <c-header-dinamic classes="header-dinamic-container-2">
      <template #content>
        <section class="flex flex-center q-py-md column">
          <q-btn
            @click="$router.go(-1)"
            icon="arrow_back"
            color="white"
            flat
            class="button-left-back"
          />
          <img
            src="logo-light.svg"
            alt="logo_guiamedica1"
            class="logo-header-banner"
          />

          <section class="row q-pt-lg full-width row q-px-lg">
            <q-input
              v-model="search"
              placeholder="Buscar por servicio"
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
        :title="serviceName"
        class="my-font-bold"
        font-size="18.2"
        color="#585858"
        line-height="30"
        font-weight="100"
        style="letter-spacing: 0.25px"
      />
    </section>

    <section v-if="isLoading" class="q-pt-md q-px-md q-gutter-y-md">
      <c-skeleton-list />
    </section>
    <section class="row q-gutter-y-lg" v-else-if="data && data.length > 0">
      <section class="col-12 row q-gutter-y-lg" v-if="searchData.length > 0">
        <c-service
          v-for="service in searchData"
          :key="service"
          v-bind="service"
          class="col-12"
        />
      </section>
      <section
        v-else
        class="text-left q-pt-sm q-px-md my-font-semibold"
        style="font-weight: 400px; color: #999; font-size: 15.36px"
      >
        El servicio que estás buscando no se encuentra registrado.
      </section>
    </section>
    <section v-else class="q-pt-lg q-px-md">
      <div
        class="text-left q-pt-sm my-font-semibold"
        style="font-weight: 400px; color: #999; font-size: 15.36px"
      >
        El servicio que estás buscando no se encuentra registrado.
      </div>
    </section>
  </q-page>
</template>

<style scoped lang="scss">
@import url('./ServicesByCategoryPage.scss');
</style>
