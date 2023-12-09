<script lang="ts" setup>
import { ref, watch } from 'vue';

export interface CDialogEmits {
  (event: 'update:modelValue', value: boolean): void;
  (event: 'confirm', value: boolean): void;
  (event: 'cancel', value: boolean): void;
}

export interface CDialogProps {
  modelValue: boolean;
  title: string;
  description?: string;
  iconName?: string;
}

const props = defineProps<CDialogProps>();
const emit = defineEmits<CDialogEmits>();

const show = ref(props.modelValue);

const close = () => {
  emit('update:modelValue', false);
  emit('cancel', false);
};

const confirm = () => {
  emit('confirm', true);
};

watch(
  () => props.modelValue,
  (value) => {
    show.value = value;
  }
);
</script>

<template>
  <q-dialog v-model="show" persistent>
    <q-card class="q-pa-md" style="border-radius: 10px">
      <q-card-section class="row items-center">
        <div class="text-h5 full-width q-pb-sm">{{ title }}</div>
        <q-avatar
          v-if="iconName"
          :icon="iconName"
          color="primary"
          text-color="white"
        />
        <span class="q-ml-sm">{{ description }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" @click="close" />
        <q-btn flat label="Confirmar" color="primary" @click="confirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
