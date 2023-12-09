<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

import { useRouter } from 'vue-router';

import CHeaderDinamic from 'src/components/Layout/CHeader/CHeaderDinamic/CHeaderDinamic.vue';
import CTitle from 'src/components/CTitle/CTitle.vue';
import CItem from 'src/components/CItem/CItem.vue';
import CSkeletonList from 'src/components/CSkeleton/CSkeletonList/CSkeletonList.vue';

import { useServiceStore } from 'src/stores/serviceStore';

const router = useRouter();

const serviceStore = useServiceStore();

const search = ref('');

const isLoading = ref(false);

const servicesCategory = computed(() => {
  return serviceStore.categories;
});

const categorySearch = computed(() => {
  if (search.value.length === 0) {
    return servicesCategory.value;
  }

  const normalizedSearch = search.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return servicesCategory.value.filter((category) => {
    const normalizedCategoryName = category.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return normalizedCategoryName.includes(normalizedSearch);
  });
});


const handleClickItem = (
  index: number,
  categoryId: string,
  categoryName: string
) => {
  const findCategory: any = servicesCategory.value.find(
    (category: any) => category._id === categoryId
  );

  if (findCategory && findCategory.name === 'Atención a domicilio') {
    router.push('/services/doctors/home-care');
  } else {
    router.push(
      '/services/category/' + categoryId + '?categoryName=' + categoryName
    );
  }
};

const getCategoriesApi = async () => {
  isLoading.value = true;
  try {
    await serviceStore.getCategories();
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getCategoriesApi();
});
</script>

<template>
  <q-page>
    <c-header-dinamic classes="header-dinamic-container-2">
      <template #content>
        <section class="flex flex-center q-py-md column">
          <img
            src="logo-light.svg"
            alt="logo_guiamedica1"
            class="logo-header-banner"
          />

          <section class="row q-pt-lg full-width row q-px-lg">
            <q-input
              v-model="search"
              placeholder="Buscar por categoría"
              class="col-12 c-search-style"
              borderless
              dense
              :input-style="{
                color: '#666',
              }"
            >
              <template #prepend>
                <q-icon name="search" style="color: #666" />
              </template>
              <template #append v-if="search.length > 0">
                <q-btn icon="close" @click="search = ''" dense flat rounded />
              </template>
            </q-input>
          </section>
        </section>
      </template>
    </c-header-dinamic>

    <section class="q-px-md q-pt-sm">
      <c-title
        title="Números de emergencia"
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
    <section v-else class="row q-pt-lg">
      <q-list v-if="categorySearch.length > 0" class="col-12">
        <c-item
          @click="handleClickItem(index, category._id, category.name)"
          v-for="(category, index) in categorySearch"
          :key="category._id"
          :title="category.name"
          :subtitle="category.description"
          :index="index"
        />
      </q-list>
      <section
        v-else
        class="col-12 q-px-md my-font-semibold"
        style="font-weight: 400px; color: #999; font-size: 15.36px"
      >
        La categoría que estás buscando no se encuentra registrada.
      </section>
    </section>
  </q-page>
</template>

<style scoped lang="scss">
@import url('./ServicesPage.scss');
</style>
