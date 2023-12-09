<script lang="ts" setup>
// props
withDefaults(
  defineProps<{
    classes?: string;
  }>(),
  {
    classes: 'header-dinamic-container',
  }
);
</script>

<template>
  <section :class="classes">
    <slot name="content" />
  </section>
</template>

<style scoped lang="scss">
@import url('./CHeaderDinamic.scss');
</style>
