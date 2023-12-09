<script setup lang="ts">
/* Este componente tambien sirve para los Centros de Especialidades (Se utiliza este mismo para mostrar los horarios) */

import { computed } from 'vue';

import { transformDays, convertTime } from 'src/helpers/Helpers';

export interface ITimes {
  end: string; // 12:00
  start: string; // 12:00
}

const props = defineProps<{
  byAppointment: boolean;
  days: number[];
  times: ITimes[]; // cuando tiene byAppointment en true no tiene times, se vuelve un array vacio
}>();

const dayString = computed(() => {
  if (props.days.length === 0) {
    if (props.byAppointment) {
      return
    }
    return 'No hay horarios';
  }
  const days = transformDays(props.days);
  return days;
});


</script>
<template>
  <section class="row" style="font-size: 15.36px">
    <div class="col-12">{{ dayString }}</div>
    <div v-if="props.byAppointment">Previa cita</div>
    <section
      v-if="props.times.length > 0"
      class="col-12 row q-gutter-x-xs"
    >
      <div
        dense
        v-for="(item, index) in props.times"
        :key="index"
        style="font-size: 15.36px; color: #222222"
        class="row"
      >
        {{ convertTime(item.start) }} - {{ convertTime(item.end) }}
        <div
          v-if="index < props.times.length - 1"
          style="font-size: 15.36px; color: #222222"
        >
          ,
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped lang="scss">
@import url('./SCheduleItemDoctor.scss');
</style>
