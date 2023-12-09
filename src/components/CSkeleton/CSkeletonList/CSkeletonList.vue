<script setup lang="ts">
// props with default values - quantity
export interface VInputProps {
  quantity?: number;
}

withDefaults(defineProps<VInputProps>(), {
  quantity: 7,
});
</script>

<template>
  <section v-for="n in quantity" :key="n" class="row items-center full-width">
    <q-skeleton type="circle" />
    <div class="col-10 row q-pl-md">
      <q-skeleton type="text" class="col-8" />
      <q-skeleton type="text" class="col-12" />
    </div>
  </section>
</template>
