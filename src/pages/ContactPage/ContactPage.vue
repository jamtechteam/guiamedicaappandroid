<script setup lang="ts">
import { ref } from 'vue';

import CHeaderDinamic from 'src/components/Layout/CHeader/CHeaderDinamic/CHeaderDinamic.vue';
import CTitle from 'src/components/CTitle/CTitle.vue';

const btns = [
  {
    label: 'Instagram',
    class: 'bg-instagram-btn text-white text-uppercase',
    icon: 'img:iconos/instagram_white.svg',
    handleClick: () => {
      // window.open('https://www.instagram.com/guiamedica1/', '_blank');
      /* try {
        var ref = cordova.InAppBrowser.open(
          'https://www.instagram.com/guiamedica.venezuela/',
          '_blank');
        window.open = cordova.InAppBrowser.open;
      } catch (error) {
        alert(error)
      } */
      try {
        window.open(
          'https://www.instagram.com/guiamedica.venezuela/',
          '_blank'
        );
      } catch (error) {
        alert(error)
      }
    },
  },
  // Afiliate con nosotros
  {
    label: 'Afíliate con nosotros',
    class: 'bg-afiliate-btn text-white text-uppercase',
    icon: 'img:iconos/icons-tab-profile/whatsapp.svg',
    handleClick: () => {
      window.open(
        'https://api.whatsapp.com/send?phone=584249060534&text=Hola,%20me%20gustaría%20afiliarme%20con%20ustedes',
        '_blank'
      );
    },
  },
  // tiktok
  /* {
    label: 'Tiktok',
    class: 'bg-tiktok-btn text-white text-uppercase',
    icon: 'img:iconos/icons-social-media/tiktok.svg',
    handleClick: () => {
      // window.open('https://www.tiktok.com/@guiamedica1', '_blank');
      try {
        var ref = cordova.InAppBrowser.open(
          'https://www.tiktok.com/@guiamedica1',
          '_blank');
        window.open = cordova.InAppBrowser.open;
      } catch (error) {
        alert(error)
      }
    },
  }, */
  // escribenos
  {
    label: 'Escríbenos',
    class: 'bg-tiktok-btn text-white text-uppercase',
    icon: 'drafts',
    handleClick: () => {
      try {
        window.open(
          'mailto:gmvaudiovisuales@gmail.com',
          '_blank'
        );
      } catch (error) {
        alert(error)
      }
      /* try {
        var ref = cordova.InAppBrowser.open(
          'mailto:gmvaudiovisuales@gmail.com',
          '_blank');
      } catch (error) {
        alert(error)
      } */
    },
  },
];

const irmailto = ref(null);
const irvencargolink = ref(null);
</script>

<template>
  <q-page style="padding-bottom: 100px">
    <c-header-dinamic classes="header-dinamic-container-2">
      <template #content>
        <section class="flex flex-center q-py-md">
          <img
            src="logo-light.svg"
            alt="logo_guiamedica1"
            class="logo-header-banner"
            style="width: 104px; height: 86.66px"
          />
        </section>
      </template>
    </c-header-dinamic>

    <section class="q-px-md q-pt-md">
      <!-- contactanos -->
      <c-title
        title="Contáctanos"
        class="q-pt-sm my-font-bold"
        font-weight="100"
        font-size="24"
        color="#000000"
        line-height="40"
      />
    </section>

    <section
      class="row q-gutter-y-lg justify-center"
      style="padding: 40px 40px 0 40px"
    >
      <q-btn
        @click="btn.handleClick"
        v-for="btn in btns"
        :key="btn.label"
        :class="btn.class"
        class="col-12 my-font-semibold"
        unelevated
      >
        <q-icon class="q-mr-sm" :name="btn.icon" size="19px" color="white" />
        {{ btn.label }}
      </q-btn>
    </section>

    <!-- <a style="display:none" ref="irmailto" href="mailto:gmvaudiovisuales@gmail.com?subject=Contacto%20desde%20app%20Guia%20Medica&body=Hola,%20me%20gustaría%20contactarme%20con%20ustedes">Link</a>
    <a style="display:none" ref="irvencargolink" href="https://venezuelacargo.com">Link</a> -->
  </q-page>
</template>

<style scoped lang="scss">
.logo-header-banner {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.bg-instagram-btn {
  background-color: #2373af;
  height: 60px;
  border-radius: 10px;
  font-weight: 800;
  letter-spacing: 0.84px;
  font-size: 14px;
}

.bg-afiliate-btn {
  background-color: rgb(38, 211, 102);
  height: 60px;
  border-radius: 10px;
  font-weight: 800;
  letter-spacing: 0.84px;
  font-size: 14px;
}

.bg-tiktok-btn {
  background-color: rgb(0, 0, 0);
  height: 60px;
  border-radius: 10px;
  font-weight: 800;
  letter-spacing: 0.84px;
  font-size: 14px;
}

.bg-escribenos-btn {
  background-color: rgb(35, 115, 175);
  height: 60px;
  border-radius: 10px;
  font-weight: 800;
  letter-spacing: 0.84px;
  font-size: 14px;
}
</style>
