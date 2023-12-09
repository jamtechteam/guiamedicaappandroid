<script setup lang="ts">
import { computed } from 'vue';

import SCheduleItemDoctor from '../SCheduleItemDoctor/SCheduleItemDoctor.vue';

const props = defineProps<{
  schedules?: any;
  medicalCenter?: any;
  address?: any;
  state?: any;
  city?: any;
}>();

const showInfoAddress = computed(() => {
  let parts = [];
  if (props.address) parts.push(props.address);
  if (props.city && props.city.name) parts.push(props.city.name);
  if (props.state && props.state.name) parts.push(props.state.name);
  return parts.join(", ");
});
</script>
<template>
  <section class="row">
    <div
      class="col-12 text-secondary text-bold"
      style="font-size: 17.6px; font-weight: 500px"
    >
      {{
        medicalCenter && medicalCenter.name
          ? medicalCenter.name
          : 'No se encontró el centro médico'
      }}
    </div>
    <section>
      <s-chedule-item-doctor
        v-for="item in schedules"
        :key="item._id"
        v-bind="item"
      />
    </section>
    <div
      class="col-12 fs-14 my-font-semibold"
      style="font-size: 15.36px; font-weight: 400px; color: #747474"
    >
      {{ showInfoAddress }}
    </div>
  </section>
</template>

<style scoped></style>
