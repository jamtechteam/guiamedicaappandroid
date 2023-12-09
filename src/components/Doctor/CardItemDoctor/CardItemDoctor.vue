<script setup lang="ts">
import { computed } from 'vue';

// emits
const emit = defineEmits<{
  (event: 'click', ...args: any[]): void;
}>();

// props
const props = defineProps<{
  name: string;
  lastName: string;
  image: string;
  specialties: any[];
}>();

// computed para separar por comas las especialidades y no mostrar la última con coma
const specialtiesArray = computed(() => {
  let specialties = '';
  props.specialties.forEach((specialty, index) => {
    if (index === props.specialties.length - 1) {
      specialties += specialty.name;
    } else {
      specialties += `${specialty.name}, `;
    }
  });
  return specialties;
});

const handleClickItem = () => {
  emit('click');
};
</script>

<template>
  <q-item
    @click="handleClickItem"
    class="card-item-doctor-container"
    v-ripple
    clickable
  >
    <q-item-section avatar>
      <q-avatar size="65px" class="avatar-style-doctor">
        <img :src="image" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label
        class="my-font-bold"
        style="font-size: 14px; font-weight: 100; letter-spacing: 0.2px"
      >
        {{ name }} {{ lastName }}
      </q-item-label>
      <q-item-label style="font-size: 13px; color: #666666">
        {{ specialtiesArray }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped lang="scss">
@import url('./CardItemDoctor.scss');
</style>
