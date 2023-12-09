<script setup lang="ts">
export interface CButtonEmits {
  (event: 'click', value: string): void;
}

// props interface and types
export interface CButtonProps {
  color?: string;
  colorHex?: string;
  label?: string;
  labelColor?: string;
  icon?: string;
  iconSrc?: string;
  colorIcon?: string;
  flat?: boolean;
  dense?: boolean;
  classBtn?: string;
}

// props default define
defineProps({
  color: {
    type: String,
    default: 'primary',
  },
  colorHex: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  labelColor: {
    type: String,
    default: 'white',
  },
  icon: {
    type: String,
    default: '',
  },
  iconSrc: {
    type: String,
    default: '',
  },
  colorIcon: {
    type: String,
    default: 'white',
  },
  flat: {
    type: Boolean,
    default: false,
  },
  dense: {
    type: Boolean,
    default: false,
  },
  classBtn: {
    type: String,
    default: '',
  },
});

// emits
const emit = defineEmits<CButtonEmits>();

// methods
const click = () => {
  emit('click', 'click');
};
</script>

<template>
  <q-btn
    @click="click"
    :color="color && !colorHex ? color : ''"
    :text-color="labelColor"
    :style="`background-color: #${colorHex};`"
    :flat="flat"
    class="style-button-1"
    :class="classBtn"
    no-caps
    unelevated
    :dense="dense"
  >
    <div class="row">
      <q-icon
        v-if="icon || iconSrc"
        :name="icon ? icon : 'img:' + iconSrc"
        :color="colorIcon"
      />
      <div :class="icon || iconSrc ? 'q-ml-sm' : ''">{{ label }}</div>
    </div>
  </q-btn>
</template>

<style lang="scss">
@import url('./CButton.scss');
</style>
