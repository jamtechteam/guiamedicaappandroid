<script setup lang="ts">
// props
defineProps({
  id: {
    default: null
  },
  title: {
    type: String,
    default: ''
  },
  to: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <q-item clickable v-ripple>
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      {{title}}
    </q-item-section>
  </q-item>
</template>
