<script lang="ts" setup>
import { ref, watch, defineEmits } from 'vue';

export interface CInputEmits {
  (event: 'blur', value: string | File | null): void;
  (
    event: 'update:modelValue',
    value?: string | number | File | null | any
  ): void;
  (event: 'focus', value: string): void;
}

// props interface and types
export interface CInputProps {
  modelValue?: File | FileList | null | any;
  placeholder?: string;
  error?: boolean;
  icon?: string;
  iconAppend?: string;
  iconPrepend?: string;
  label?: string;
  labelTitle?: string;
  debounce?: string;
  autofocus?: boolean;
  square?: boolean;
  fit?: string;
}

// props
const props = withDefaults(defineProps<CInputProps>(), {
  modelValue: null,
  placeholder: '',
  error: false,
  icon: '',
  iconAppend: '',
  iconPrepend: '',
  label: '',
  labelTitle: '',
  debounce: '0',
  autofocus: false,
  square: false,
  fit: 'none',
});

// data
const model = ref(null);
const inputRef = ref<HTMLElement | null>(null);
const inputImageSrc = ref<string | null | ArrayBuffer>(props.modelValue?.src);

// emits
const emit = defineEmits<CInputEmits>();

const changeToSrc = (file: File) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    inputImageSrc.value = reader.result;
    emit('update:modelValue', {
      file,
      src: reader.result,
    });
  };
};

const blurCmp = (e) => {
  // emit blur
  changeToSrc(e.target.files[0]);
  emit('blur', model.value);
};

const clickInput = () => {
  // get ref
  const input = inputRef.value;
  input.$el.click();
  // click
};

// watch prop modelValue
watch(
  () => props.modelValue,
  (value) => {
    console.log(value, 'value');
    inputImageSrc.value = value?.src;
  }
);
</script>

<template>
  <section
    class="row field-container-file flex flex-center"
    @click="clickInput"
  >
    <img v-if="!inputImageSrc" src="iconos/noimg.png" class="not-img-file" />
    <q-avatar v-else class="img-file" :square="square">
      <img :src="inputImageSrc" />
    </q-avatar>
    <q-file
      v-model="model"
      :error="error"
      @blur="blurCmp"
      @input="blurCmp"
      accept=".jpg, .jpeg, .png"
      ref="inputRef"
      style="display: none"
    />
  </section>
</template>

<style lang="scss">
@import url('./CInputImage.scss');
</style>
