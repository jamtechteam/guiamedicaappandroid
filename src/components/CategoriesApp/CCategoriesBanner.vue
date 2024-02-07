<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { useRouter } from 'vue-router';

import { useCategoryAppStore } from 'src/stores/categoryAppStore';

import { ICategoryApp } from 'src/interfaces/ICategoryApp.interface';

// emit - changeLoadedCategoriesApp
const emit = defineEmits(['changeLoadedCategoriesApp']);

const categoryAppStore = useCategoryAppStore();

const router = useRouter();

const categories = ref<any[]>([]);
const slide = ref(0);

const handleClickCategory = (category: ICategoryApp) => {
  router.push({
    name: 'categories',
    query: {
      title: category.title,
      secondary_image: category.secondary_image,
      category_id: category._id,
    },
  });
};

const getCategories = async () => {
  try {
    const res = await categoryAppStore.getCategoriesAppCarousel();
    const first = res[0][0]
    const second = res[0][1]
    // ahora colocar el primero en el segundo lugar y el segundo en el primer lugar
    res[0][0] = second;
    res[0][1] = first;
    categories.value = res;
  } catch {
    console.log('Error al obtener las categorias');
  } finally {
    emit('changeLoadedCategoriesApp', true);
  }
};

onMounted(() => {
  getCategories();
});
</script>

<template>
  <q-carousel
    v-model="slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    swipeable
    animated
    control-color="primary"
    infinite
    padding
    height="220px"
    class="bg-transparent"
    ref="REF_carousel"
  >
    <q-carousel-slide
      v-for="(categoriesApp, index) in categories"
      :key="index"
      :name="index"
      class="column no-wrap"
    >
      <div class="row fit justify-around items-center no-wrap">
        <div
          v-for="(category, index2) in categoriesApp"
          :key="index2"
          class="column items-center"
          @click="handleClickCategory(category)"
        >
          <q-img
            class="rounded-borders col-6 img-style-circle"
            :src="category.principal_image"
          />
          <div
            class="text-secondary q-pt-sm text-bold text-center text-subtitle2"
            style="max-width: 100px"
          >
            {{ category.title }}
          </div>
        </div>
      </div>
    </q-carousel-slide>

    <template v-slot:control>
      <q-carousel-control position="bottom" :offset="[0, 0]">
        <section
          class="row full-width items-center justify-center q-gutter-x-sm"
        >
          <div
            v-for="n in categories.length"
            :key="n"
            class="circle-control-carousel"
            :class="slide === n - 1 ? 'active-carousel-control' : ''"
          />
        </section>
      </q-carousel-control>
    </template>
  </q-carousel>
  <!-- <div class="container-scroll-snap-mobile row no-wrap">
    <div
      v-for="(cat, index) in categories"
      :key="index"
      :name="index"
      class="item-scroll-snap-mobile col-6"
    >
      <section class="column items-center q-px-md" style="width: 100%">
        <img :src="cat.principal_image" alt="asdasdasd" />
        <div
          class="text-secondary q-pt-sm text-bold text-subtitle2 text-center"
        >
          {{ cat.title }}
        </div>
      </section>
    </div>
  </div> -->
</template>

<style scoped lang="scss">
@import url('./CCategoriesBanner.scss');
</style>
