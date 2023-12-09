<script setup lang="ts">
// props
defineProps<{
  title: string;
  subtitle: string;
  icon?: string;
  index: number;
}>();
</script>
<template>
  <div>
    <q-item clickable v-ripple>
      <q-item-section avatar top>
        <img
          :src="
            index === 0
              ? 'iconos/icons-services/doctor2.svg'
              : 'iconos/icons-services/emergency.svg'
          "
          style="width: 40px; height: 40px"
        />
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
          >{{ title }}</q-item-label
        >
        <q-item-label
          style="font-size: 14px; font-weight: 100; color: #666666"
          >{{ subtitle }}</q-item-label
        >
      </q-item-section>

      <q-item-section side>
        <q-icon name="keyboard_arrow_right" color="grey-4" />
      </q-item-section>
    </q-item>
    <q-separator spaced inset class="bg-grey-3" style="margin-left: 70px" />
  </div>
</template>

<style scoped></style>
