<template>
  <section class="row field-container">
    <!-- slot para un titulo encima del inpurt -->
    <div class="col-12 text-black text-bold q-pb-sm" v-if="labelTitle">
      {{ labelTitle }}
    </div>
    <q-input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :error="error"
      color="primary"
      borderless
      class="col-12"
      :class="`${isFocus ? 'c-input-style-focus' : 'c-input-style'} `"
      @focus="focusCmp"
      @blur="blurCmp"
      dense
      :autofocus="autofocus"
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
    </q-input>
  </section>
</template>

<script lang="ts" setup>
import { ref, watch, defineEmits } from 'vue';

export interface VInputEmits {
  (event: 'blur', value: string): void;
  (event: 'update:modelValue', value?: string | number): void;
  (event: 'focus', value: string): void;
  (event: 'clickIconAppend', value: string): void;
  (event: 'clickIconPrepend', value: string): void;
}

// props interface and types
export interface VInputProps {
  modelValue?: string | number;
  type?: string;
  placeholder?: string;
  error?: boolean;
  icon?: string;
  iconAppend?: string;
  iconPrepend?: string;
  label?: string;
  labelTitle?: string;
  debounce?: string;
  autofocus?: boolean;
}

// props
const props = withDefaults(defineProps<VInputProps>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  error: false,
  icon: '',
  iconAppend: '',
  iconPrepend: '',
  label: '',
  labelTitle: '',
  debounce: '0',
  autofocus: false,
});

// data
const isFocus = ref(false);
const model = ref(props.modelValue);

// emits
const emit = defineEmits<VInputEmits>();

// watch
watch(
  () => model.value,
  (val: string | number) => {
    model.value = val;
    onInput(val);
  }
);

// watch modelValue
watch(
  () => props.modelValue,
  (val) => {
    model.value = val;
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

<style lang="scss">
@import url('./CInput.scss');
</style>
