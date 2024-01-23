<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

import SCheduleItem from 'src/components/Doctor/SCheduleItemDoctor/SCheduleItemDoctor.vue';

import { useConsultingRoomStore } from 'src/stores/consultingRoomStore';

import { Loading } from 'quasar';

import { transformServices } from 'src/helpers/Helpers';

const consultingRoomStore = useConsultingRoomStore();

const router = useRouter();

const tab = ref(1);

const consultingRoom = ref<any>();

const getData = async () => {
  Loading.show();
  try {
    const { id } = router.currentRoute.value.params;
    await consultingRoomStore.getConsultingRoom(id);
    consultingRoom.value = consultingRoomStore.consultingRoom;
  } catch (error) {
    console.log(error);
  } finally {
    Loading.hide();
  }
};

const handleClickOpenNumberPhone = () => {
  window.open(`tel:${consultingRoom.value.phone}`);
};

const handleClickOpenUrlSocialNetwork = (url: string) => {
  // window.open(url);
  try {
    window.open(url, '_blank');
  } catch (error) {
    alert(error)
  }
};

const handleClickOpenWhatsapp = () => {
  window.open(`https://wa.me/${consultingRoom.value.whatsapp}`);
};

const handleClickOpenNumberPhoneDynamic = (phone: string) => {
  window.open(`tel:${phone}`);
};

const handleClickOpenMailDynamic = (mail: string) => {
  window.open(`mailto:${mail}`);
};
// computed para formattear las especialidades por coma utilizando el helper
const specialties = computed(() => {
  return '';
});

const goBack = () => {
  router.go(-1);
};

onMounted(() => {
  getData();
});
</script>
<template>
  <q-page class="bg-white column">
    <div class="row container-header-top">
      <section class="full-width">
        <div class="row justify-between q-pt-lg">
          <q-btn icon="arrow_back" color="white" flat @click="goBack" rounded />
          <q-btn
            @click="handleClickOpenWhatsapp"
            v-if="consultingRoom && consultingRoom.whatsapp"
            flat
            icon-right="img:iconos/icons-tab-profile/whatsapp.svg"
            label="Contacto"
            no-caps
            color="white"
            class="text-bold"
            style="font-weight: 100px; font-size: 16px"
          />
          <q-skeleton
            v-else-if="!consultingRoom"
            type="QBtn"
          />
        </div>
      </section>
    </div>

    <section class="page-container-room">
      <section class="row justify-center container-avatar-room">
        <q-avatar
          size="170px"
          class="style-avatar-img-room bg-white"
          v-if="consultingRoom"
        >
          <q-img
            :src="consultingRoom.image"
            spinner-color="primary"
            fit="fill"
          />
        </q-avatar>
        <q-skeleton
          v-else
          type="QAvatar"
          size="120px"
          class="style-avatar-img-room-skeleton"
        />
      </section>

      <section class="row" style="position: relative; top: -70px">
        <section class="col-12 row justify-center">
          <div
            v-if="consultingRoom"
            class="text-bold text-center col-12 my-font-bold"
            style="font-size: 17.6px; font-weight: 100"
          >
            {{ consultingRoom.name }} {{ consultingRoom.lastName }}
          </div>
          <div
            v-if="consultingRoom"
            class="col-12 text-bold text-center q-px-lg text-grey-7"
          >
            {{ specialties }}
          </div>
          <q-skeleton v-if="!consultingRoom" type="text" class="col-6" />
          <q-skeleton v-if="!consultingRoom" type="text" class="col-8" />
          <q-skeleton v-if="!consultingRoom" type="QBtn" class="col-6" />
        </section>
      </section>

      <section style="position: relative; top: -50px">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="secondary"
          indicator-color="secondary"
          align="justify"
        >
          <q-tab :name="1" icon="img:iconos/icons-tab-profile/calendar.svg" />
          <q-tab :name="2" icon="img:iconos/icons-tab-profile/id.svg" />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            :name="1"
            class="bg-svg-tabpanel max-height-style q-pt-md"
            style="padding: 20px 20px 0 20px"
          >
            <q-chip
              class="text-uppercase text-white text-bold ls-1 fs-14"
              square
              style="
                font-size: 14.4px;
                font-weight: 500px;
                background: #2e6daf;
                line-height: 14.28px;
                height: 27.28px;
                padding: 6px 10px 4px 10px;
                letter-spacing: 2.2px;
                border-radius: 7px;
                margin-left: -2px !important;
              "
            >
              Horario de trabajo
            </q-chip>

            <section class="q-pt-sm q-gutter-y-lg" v-if="consultingRoom">
              <s-chedule-item
                v-for="item in consultingRoom.schedules"
                :key="item._id"
                v-bind="item"
              />
            </section>

            <!-- <q-chip
              class="text-uppercase text-white text-bold ls-1 fs-14 q-mt-md"
              square
              label="Dirección"
              style="
                font-size: 14.4px;
                font-weight: 500px;
                background: #2e6daf;
                line-height: 14.28px;
                height: 27.28px;
                padding: 6px 10px 4px 10px;
                letter-spacing: 2.2px;
                border-radius: 7px;
              "
            /> -->

            <div
              class="text-white text-bold ls-1 q-mt-md"
              :style="{
                background: 'rgb(46, 109, 175)',
                borderRadius: '7px',
                width: 'fit-content',
                padding: '6px 10px 4px 10px',
                fontSize: '14.4px',
              }"
            >
              DIRECCIÓN
            </div>

            <section
              v-if="consultingRoom"
              class="q-pt-sm"
              style="color: #7c7c7c; font-size: 15.36px; margin-top: 2px"
            >
              {{ consultingRoom.address }}
            </section>

            <q-chip
              class="text-uppercase text-white text-bold ls-1 q-mt-md"
              square
              label="Servicios"
              style="
                font-size: 14.4px;
                font-weight: 500px;
                background: #2e6daf;
                line-height: 14.28px;
                height: 27.28px;
                padding: 6px 10px 4px 10px;
                letter-spacing: 2.2px;
                border-radius: 7px;
                margin-left: -1px !important;
              "
            />

            <section v-if="consultingRoom" class="row">
              <div
                class="text-left fs-16 q-pt-sm my-font-semibold"
                style="font-size: 15.36px; color: #7c7c7c"
              >
                {{ transformServices(consultingRoom.services) }}
              </div>
            </section>
          </q-tab-panel>
          <q-tab-panel
            :name="2"
            class="max-height-style bg-svg-tabpanel"
            style="padding: 0px 20px"
          >
            <q-chip
              class="text-uppercase text-white text-bold ls-1 fs-14 q-mt-lg"
              square
              label="Contacto"
              style="
                font-size: 14.4px;
                font-weight: 500px;
                background: #2e6daf;
                line-height: 14.28px;
                height: 27.28px;
                padding: 6px 10px 4px 10px;
                letter-spacing: 2.2px;
                border-radius: 7px;
              "
            />

            <section class="row q-pt-sm" v-if="consultingRoom">
              <section
                @click="handleClickOpenNumberPhone"
                class="row q-gutter-x-sm items-center relative-position col-12 q-py-sm q-pl-sm"
                v-ripple
              >
                <q-icon name="bi-telephone" color="secondary" size="20px" />
                <div
                  class="text-subtitle2 ls-1 my-font-semibold"
                  style="font-weight: 400px; color: #747474; font-size: 15.36px"
                >
                  {{ consultingRoom.phone }}
                </div>
              </section>
            </section>

            <q-chip
              v-if="consultingRoom && consultingRoom.numberOffice"
              class="text-uppercase text-white text-bold ls-1 q-mt-md"
              square
              label="Teléfono consultorio"
              style="
                font-size: 14.4px;
                font-weight: 500px;
                background: #2e6daf;
                line-height: 14.28px;
                height: 27.28px;
                padding: 6px 10px 4px 10px;
                letter-spacing: 2.2px;
                border-radius: 7px;
              "
            />

            <section
              class="row q-pt-sm"
              v-if="consultingRoom && consultingRoom.numberOffice"
            >
              <section
                @click="
                  handleClickOpenNumberPhoneDynamic(consultingRoom.numberOffice)
                "
                class="row q-gutter-x-sm items-center relative-position col-12 q-py-sm q-pl-sm"
                v-ripple
              >
                <q-icon name="bi-telephone" color="secondary" size="20px" />
                <div
                  class="text-subtitle2 ls-1 my-font-semibold"
                  style="font-weight: 400px; color: #747474; font-size: 15.36px"
                >
                  {{ consultingRoom.numberOffice }}
                </div>
              </section>
            </section>

            <q-chip
              v-if="consultingRoom && consultingRoom.socialNetworks.length"
              class="text-uppercase text-white text-bold ls-1 q-mt-md"
              square
              label="Redes sociales"
              style="
                font-size: 14.4px;
                font-weight: 500px;
                background: #2e6daf;
                line-height: 14.28px;
                height: 27.28px;
                padding: 6px 10px 4px 10px;
                letter-spacing: 2.2px;
                border-radius: 7px;
              "
            />

            <section class="q-pt-sm">
              <section
                @click="handleClickOpenUrlSocialNetwork(social.url)"
                v-for="(social, index) in consultingRoom.socialNetworks"
                :key="index"
                class="row q-gutter-x-sm items-center q-pa-sm relative-position"
                v-ripple
              >
                <img :src="social.image" style="width: 25px" />
                <div
                  class="ls-1 my-font-semibold"
                  style="color: #747474; font-size: 15.36px"
                >
                  {{ social.username }}
                </div>
              </section>
            </section>

            <!-- <q-chip
              v-if="consultingRoom && consultingRoom.email"
              class="text-uppercase text-white text-bold ls-1 q-mt-md"
              square
              label="Correo electrónico"
              style="
                font-size: 14.4px;
                font-weight: 500px;
                background: #2e6daf;
                line-height: 14.28px;
                height: 27.28px;
                padding: 6px 10px 4px 10px;
                letter-spacing: 2.2px;
                border-radius: 7px;
              "
            /> -->

            <div
              v-if="consultingRoom && consultingRoom.email"
              class="text-white text-bold ls-1 q-mt-md flex flex-center"
              :style="{
                background: 'rgb(46, 109, 175)',
                borderRadius: '7px',
                width: 'fit-content',
                padding: '5px 10px 4px 10px',
                fontSize: '14.4px',

              }"
            >
              CORREO ELECTRÓNICO
            </div>

            <section
              class="row q-pt-sm"
              v-if="consultingRoom && consultingRoom.email"
            >
              <section
                @click="handleClickOpenMailDynamic(consultingRoom.email)"
                class="row q-gutter-x-sm items-center relative-position col-12 q-py-sm q-pl-sm"
                v-ripple
              >
                <q-icon name="drafts" color="secondary" size="20px" />
                <div
                  class="text-subtitle2 ls-1 my-font-semibold"
                  style="font-weight: 400px; color: #747474; font-size: 15.36px"
                >
                  {{ consultingRoom.email }}
                </div>
              </section>
            </section>

            <q-chip
              v-if="consultingRoom.website"
              class="text-uppercase text-white text-bold ls-1 q-mt-md"
              square
              label="PÁGINA WEB"
              style="
                font-size: 14.4px;
                font-weight: 500px;
                background: #2e6daf;
                line-height: 14.28px;
                height: 27.28px;
                padding: 6px 10px 4px 10px;
                letter-spacing: 2.2px;
                border-radius: 7px;
              "
            />
            <section v-if="consultingRoom.website" class="q-pt-sm">
              <section
                @click="handleClickOpenUrlSocialNetwork(consultingRoom.website)"
                class="row q-gutter-x-sm items-center q-pa-sm relative-position"
                v-ripple
              >
                <img
                  src="iconos/icons-social-media/at.svg"
                  style="width: 25px"
                />
                <div
                  class="text-subtitle2 ls-1"
                  style="font-size: 15.36px; color: #7c7c7c"
                >
                  {{ consultingRoom.website }}
                </div>
              </section>
            </section>
          </q-tab-panel>
        </q-tab-panels>
      </section>
    </section>
  </q-page>
</template>

<style scoped lang="scss">
@import url('./ConsultingRoomPage.scss');
</style>
