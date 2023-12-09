<script lang="ts" setup>
import { ref, watch, defineEmits } from 'vue';

export interface VSelectEmits {
  (event: 'blur', value: string): void;
  (event: 'update:modelValue', value?: string | number): void;
  (event: 'focus', value: string): void;
  (event: 'clickIconAppend', value: string): void;
  (event: 'clickIconPrepend', value: string): void;
  (event: 'change', value: string): void;
}

// props interface and types
export interface VSelectProps {
  modelValue?: string | number | object | any;
  options: [] | null | undefined;
  optionLabel?: string;
  optionValue?: string;
  emitValue?: boolean;
  placeholder?: string;
  error?: boolean;
  icon?: string;
  iconAppend?: string;
  iconPrepend?: string;
  label?: string;
  labelTitle?: string;
  labelTitleClass?: string;
  clearable?: boolean;
  behavior?: string;
  disabled?: boolean;
}

// props
const props = withDefaults(defineProps<VSelectProps>(), {
  modelValue: '',
  options: null,
  optionLabel: 'label',
  optionValue: 'value',
  emitValue: true,
  placeholder: '',
  error: false,
  icon: '',
  iconAppend: '',
  iconPrepend: '',
  label: '',
  labelTitle: '',
  labelTitleClass: 'text-black text-bold',
  clearable: false,
  behavior: 'menu',
  disabled: false,
});

// data
const isFocus = ref(false);
const model = ref(props.modelValue);

// emits
const emit = defineEmits<VSelectEmits>();

// watch
watch(
  () => model.value,
  (val: string | number | object) => {
    model.value = val;
    onInput(val);
  }
);

// watch modelValue
watch(
  () => props.modelValue,
  (val) => {
    model.value = val;
    emit('change', val)
  }
);

// methods
const onInput = (val: string) => {
  emit('update:modelValue', val);
};

const blurCmp = () => {
  // emit blur
  emit('blur', model.value);
  focusCmp();
};

const focusCmp = () => {
  isFocus.value = !isFocus.value;
};

const clickIcon = (nameIcon: string) => {
  emit('clickIconAppend', nameIcon);
};
</script>

<template>
  <section class="row field-container">
    <!-- slot para un titulo encima del inpurt -->
    <div
      class="col-12 text-bold q-pb-sm"
      :class="labelTitleClass"
      v-if="labelTitle"
    >
      {{ labelTitle }}
    </div>
    <q-select
      v-model="model"
      :error="error"
      :options="options"
      :option-label="optionLabel"
      :option-value="optionValue"
      :emit-value="emitValue"
      :clearable="clearable"
      @focus="focusCmp"
      @blur="blurCmp"
      :disable="disabled"
      map-options
      color="primary"
      class="col-12"
      dense
      native
    >
      <template v-slot:prepend v-if="icon">
        <q-icon :name="icon" :color="isFocus ? 'primary' : 'grey'" />
      </template>

      <!-- Label Slot -->
      <template v-slot:label v-if="label">
        <div class="text-weight-bold">{{ label }}</div>
      </template>

      <!-- slot append -->
      <template v-slot:append v-if="iconAppend">
        <q-icon
          :name="iconAppend"
          :color="isFocus ? 'primary' : 'grey'"
          @click="clickIcon('Append')"
          class="cursor-pointer"
        />
      </template>
    </q-select>
  </section>
</template>

<style lang="scss">
@import url('./CSelect.scss');
</style>
