<script setup lang="ts">
// props
defineProps<{
  name: string;
  address: string;
  phone1: string;
  phone2: string;
}>();

const handleClickOpenPhone = (phone: string) => {
  window.location.href = 'tel:' + phone;
};
</script>
<template>
  <div>
    <q-item clickable>
      <q-item-section avatar>
        <q-avatar>
          <img src="phone1.svg" alt="phone" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label
          class="my-font-semibold"
          style="font-size: 15.4px; font-weight: 800; letter-spacing: 0.2px"
          >{{ name }}</q-item-label
        >
        <q-item-label
          style="font-size: 14px; font-weight: 100; color: #666666"
          >{{ address }}</q-item-label
        >
        <div
          v-if="phone1"
          @click="handleClickOpenPhone(phone1)"
          class="row items-center q-pt-md"
        >
          <q-icon
            name="bi-telephone"
            class="q-pr-sm"
            color="secondary"
            size="24px"
          />
          <div style="font-size: 14.7456px; font-weight: 100; color: #747474">
            {{ phone1 }}
          </div>
        </div>
        <div
          v-if="phone2"
          class="row items-center q-pt-md"
          @click="handleClickOpenPhone(phone2)"
        >
          <q-icon
            name="bi-telephone"
            class="q-pr-sm"
            color="secondary"
            size="24px"
          />
          <div style="font-size: 14.7456px; font-weight: 100; color: #747474">
            {{ phone2 }}
          </div>
        </div>
      </q-item-section>
    </q-item>
    <q-separator
      spaced
      inset
      class="bg-grey-3"
      style="margin-left: 70px; margin-top: 20px"
    />
  </div>
</template>

<style scoped lang="scss">
@import url('./CService.scss');
</style>
