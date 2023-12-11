<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

import OfficeItemDoctor from 'src/components/Doctor/OfficeItemDoctor/OfficeItemDoctor.vue';

import { useDoctorStore } from 'src/stores/doctorStore';
import { useFavoriteDoctorStore } from 'src/stores/favoriteDoctorStore';

import { Loading } from 'quasar';

import { transformServices } from 'src/helpers/Helpers';

const doctorStore = useDoctorStore();
const favoriteDoctorStore = useFavoriteDoctorStore();

const router = useRouter();

const tab = ref(1);

const doctor = ref<any>();

const isFavorite = computed(() => {
  if (!doctor.value) return false;

  return favoriteDoctorStore.isFavorite(doctor.value._id);
});

const getDoctor = async () => {
  Loading.show();
  await doctorStore.getDoctor(router.currentRoute.value.params.id);
  doctor.value = doctorStore.doctor;
  Loading.hide();
};

const saveFavoriteDoctor = () => {
  favoriteDoctorStore.addFavorite(doctor.value);
};

const removeFavoriteDoctor = () => {
  favoriteDoctorStore.removeFavorite(doctor.value._id);
};

const handleClickFavorite = () => {
  if (isFavorite.value) {
    removeFavoriteDoctor();
  } else {
    saveFavoriteDoctor();
  }
};

const handleClickOpenNumberPhone = () => {
  window.open(`tel:${doctor.value.phone}`);
};

const handleClickOpenNumberPhoneDynamic = (phone: string) => {
  window.open(`tel:${phone}`);
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
  window.open(`https://wa.me/${doctor.value.whatsapp}`);
};

const handleClickOpenMailDynamic = (mail: string) => {
  window.open(`mailto:${mail}`);
};

// computed para formattear las especialidades por coma utilizando el helper
const specialties = computed(() => {
  if (!doctor.value) return '';

  return doctor.value?.specialties
    .map((specialty: any) => specialty.name)
    .join(', ');
});

const goBack = () => {
  router.go(-1);
};

onMounted(async () => {
  await getDoctor();
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
            v-if="doctor"
            flat
            icon-right="img:iconos/icons-tab-profile/whatsapp.svg"
            label="Contacto"
            no-caps
            color="white"
            class="my-font-bold"
            style="font-weight: 100px; font-size: 16px"
          />
          <q-skeleton v-else type="QBtn" />
        </div>
      </section>
    </div>

    <section class="page-container-doctor">
      <section class="row justify-center container-avatar-doctor">
        <q-avatar
          size="170px"
          class="style-avatar-img-doctor bg-white"
          v-if="doctor"
        >
          <q-img :src="doctor.image" spinner-color="primary" fit="fill" />
        </q-avatar>
        <q-skeleton
          v-else
          type="QAvatar"
          size="120px"
          class="style-avatar-img-doctor-skeleton"
        />
      </section>

      <section class="row" style="position: relative; top: -70px">
        <section class="col-12 row justify-center">
          <div
            v-if="doctor"
            class="text-bold text-center col-12 my-font-bold q-px-md"
            style="font-size: 17.6px; font-weight: 100"
          >
            {{ doctor.professions[0].abbreviation }}. {{ doctor.name }}
            {{ doctor.lastName }}
          </div>
          <div
            v-if="doctor"
            class="col-12 text-bold text-center q-px-lg column"
            style="font-weight: 500px; color: #999; font-size: 15.2px"
          >
            <div
              v-for="specialty in doctor.specialties"
              :key="specialty._id"
              style="font-weight: 500px; color: #999; font-size: 15.2px"
            >
              {{ specialty.name }}
            </div>
          </div>
          <q-btn
            v-if="doctor"
            @click="handleClickFavorite"
            dense
            :flat="!isFavorite"
            :label="!isFavorite ? 'Agregar a favoritos' : 'Favorito'"
            class="my-font-bold favorite-btn-doctor q-mt-sm"
            :icon="!isFavorite ? 'favorite_border' : 'favorite'"
            unelevated
            :style="{
              background: !isFavorite ? '#fff' : '#14B314',
              color: !isFavorite ? '#14b314' : '#fff',
              with: 'auto',
              padding: '0px 10px',
            }"
          />
          <q-skeleton v-if="!doctor" type="text" class="col-6" />
          <q-skeleton v-if="!doctor" type="text" class="col-8" />
          <q-skeleton v-if="!doctor" type="QBtn" class="col-6" />
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
          <q-tab :name="1">
            <q-icon
              size="24px"
              class="q-mb-sm"
              :style="{
                color: tab === 1 ? '#005ca2' : '#666666',
              }"
            >
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 472.148 472.148"
                style="enable-background: new 0 0 472.148 472.148"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <g>
                      <path
                        d="M407.698,209.068V75.843c0-22.988-20.375-39.184-43.363-39.184h-35.004V8.448c0.626-3.991-2.102-7.733-6.093-8.359
				c-0.751-0.118-1.516-0.118-2.266,0h-49.633c-5.747,0-9.927,2.612-9.927,8.359V36.66H146.474V8.448
				c0-5.747-6.792-8.359-12.539-8.359H84.302c-5.747,0-10.971,2.612-10.971,8.359V36.66H41.462
				c-22.988,0-41.273,16.196-41.273,39.184v303.02c0,22.988,18.286,39.184,41.273,39.184H215.96
				c49.473,62.037,139.87,72.223,201.907,22.75c33.975-27.094,53.862-68.111,54.093-111.566
				C471.113,281.172,447.199,236.455,407.698,209.068z M282.311,20.986h26.122v47.02h-26.122V20.986z M94.229,20.986h31.347v47.02
				H94.229V20.986z M21.086,75.843c0-11.494,8.882-18.286,20.376-18.286h31.869v19.853c0.241,6.048,4.942,10.972,10.971,11.494
				h49.633c6.358-0.416,11.572-5.196,12.539-11.494V57.558h114.939v19.853c-0.306,5.872,4.072,10.942,9.927,11.494h49.633
				c5.747,0,8.359-5.747,8.359-11.494V57.558h35.004c11.494,0,22.465,6.792,22.465,18.286v65.306H21.086V75.843z M41.462,397.15
				c-11.494,0-20.376-6.792-20.376-18.286V162.047H386.8v36.049c-18.356-7.834-38.039-12.089-57.992-12.539
				c-79.349,0.096-143.596,64.498-143.5,143.847c0.029,23.642,5.891,46.911,17.067,67.745H41.462z M327.764,451.484
				c-67.806,0.288-123.008-54.447-123.296-122.253c-0.288-67.806,54.447-123.008,122.253-123.296
				c67.806-0.288,123.008,54.447,123.296,122.253c0.001,0.348,0.001,0.695,0,1.043C450.017,396.75,395.282,451.484,327.764,451.484z
				"
                      />
                      <path
                        d="M376.874,329.231h-47.543v-62.694c0-5.771-4.678-10.449-10.449-10.449c-5.771,0-10.449,4.678-10.449,10.449v73.143
				c1.03,6.099,6.354,10.535,12.539,10.449h55.902c5.771,0,10.449-4.678,10.449-10.449S382.645,329.231,376.874,329.231z"
                      />
                    </g>
                  </g>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </svg>
            </q-icon>
          </q-tab>
          <q-tab :name="2">
            <q-icon
              size="24px"
              class="q-mb-sm"
              :style="{
                color: tab === 2 ? '#005ca2' : '#666666',
              }"
            >
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                style="enable-background: new 0 0 512 512"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M196.44,340.115C205.502,329.603,211,315.936,211,301c0-33.084-26.916-60-60-60s-60,26.916-60,60
                  c0,14.936,5.498,28.603,14.56,39.115C79.126,353.765,61,381.337,61,413.082V436c0,8.284,6.716,15,15,15h150
                  c8.284,0,15-6.716,15-15v-22.918C241,381.337,222.874,353.765,196.44,340.115z M151,271c16.542,0,30,13.458,30,30
                  s-13.458,30-30,30s-30-13.458-30-30S134.458,271,151,271z M211,421H91v-7.918C91,384.364,114.364,361,143.082,361h15.836
                  C187.636,361,211,384.364,211,413.082V421z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M467,90H331V75c0-41.355-33.645-75-75-75c-41.355,0-75,33.645-75,75v15H45c-24.813,0-45,20.187-45,45
                  c0,4.117,0,311.718,0,332c0,24.813,20.187,45,45,45h422c24.813,0,45-20.187,45-45c0-19.965,0-327.569,0-332
                  C512,110.187,491.813,90,467,90z M211,75c0-24.813,20.187-45,45-45s45,20.187,45,45v45h-90V75z M482,467c0,8.271-6.729,15-15,15
                  H45c-8.271,0-15-6.729-15-15V210h452V467z M482,180H30v-45c0-8.271,6.729-15,15-15h136v15c0,8.284,6.716,15,15,15h120
                  c8.284,0,15-6.716,15-15v-15h136c8.271,0,15,6.729,15,15V180z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M437,271H286c-8.284,0-15,6.716-15,15s6.716,15,15,15h151c8.284,0,15-6.716,15-15S445.284,271,437,271z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M437,331H286c-8.284,0-15,6.716-15,15s6.716,15,15,15h151c8.284,0,15-6.716,15-15S445.284,331,437,331z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M437,391H286c-8.284,0-15,6.716-15,15s6.716,15,15,15h151c8.284,0,15-6.716,15-15S445.284,391,437,391z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <circle cx="256" cy="75" r="15" />
                  </g>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </svg>
            </q-icon>
          </q-tab>
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            :name="1"
            class="bg-svg-tabpanel max-height-style"
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
                margin-left: -1px !important;
              "
            >
              Horario de trabajo
            </q-chip>

            <section class="q-pt-sm q-gutter-y-lg" v-if="doctor">
              <office-item-doctor
                v-for="office in doctor.offices"
                :key="office._id"
                v-bind="office"
              />
            </section>

            <q-chip
              class="text-uppercase text-white text-bold ls-1 fs-14 q-mt-md"
              square
              label="Especialidades"
              style="
                font-size: 14.4px;
                font-weight: 500px;
                background: #2e6daf;
                line-height: 14.28px;
                height: 27.28px;
                padding: 6px 10px 4px 10px;
                letter-spacing: 2.2px;
                border-radius: 7px;
                margin-left: -1px !impFortant;
              "
            />

            <section v-if="doctor" class="row">
              <div
                class="text-left q-pt-sm my-font-semibold"
                style="font-weight: 400px; color: #747474; font-size: 15.36px"
              >
                {{ transformServices(doctor.services) }}
              </div>
            </section>
          </q-tab-panel>
          <q-tab-panel
            :name="2"
            class="max-height-style bg-svg-tabpanel"
            style="padding: 0px 20px"
          >
            <q-chip
              class="text-uppercase text-white text-bold ls-1 q-mt-md"
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

            <section class="row q-pt-sm" v-if="doctor">
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
                  {{ doctor.phone }}
                </div>
              </section>
            </section>

            <q-chip
              v-if="doctor && doctor.numberOffice"
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

            <section class="row q-pt-sm" v-if="doctor && doctor.numberOffice">
              <section
                @click="handleClickOpenNumberPhoneDynamic(doctor.numberOffice)"
                class="row q-gutter-x-sm items-center relative-position col-12 q-py-sm q-pl-sm"
                v-ripple
              >
                <q-icon name="bi-telephone" color="secondary" size="20px" />
                <div
                  class="text-subtitle2 ls-1 my-font-semibold"
                  style="font-weight: 400px; color: #747474; font-size: 15.36px"
                >
                  {{ doctor.numberOffice }}
                </div>
              </section>
            </section>

            <q-chip
              v-if="doctor && doctor.socialNetworks.length > 0"
              class="text-uppercase text-white text-bold ls-1 fs-14 q-mt-md"
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
                v-for="(social, index) in doctor.socialNetworks"
                :key="index"
                class="row q-gutter-x-sm items-center q-pa-sm relative-position"
                v-ripple
              >
                <img :src="social.image" style="width: 25px" />
                <div
                  class="ls-1 my-font-semibold"
                  style="color: #747474; font-size: 14.74px; font-weight: 400px"
                >
                  {{ social.username }}
                </div>
              </section>
            </section>

            <q-chip
              v-if="doctor && doctor.email"
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
            />

            <section class="row q-pt-sm" v-if="doctor && doctor.email">
              <section
                @click="handleClickOpenMailDynamic(doctor.email)"
                class="row q-gutter-x-sm items-center relative-position col-12 q-py-sm q-pl-sm"
                v-ripple
              >
                <q-icon name="o_mail" color="secondary" size="20px" />
                <div
                  class="text-subtitle2 ls-1 my-font-semibold"
                  style="font-weight: 400px; color: #747474; font-size: 15.36px"
                >
                  {{ doctor.email }}
                </div>
              </section>
            </section>

            <q-chip
              v-if="doctor.website"
              class="text-uppercase text-white text-bold ls-1 fs-14 q-mt-md"
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
            <section v-if="doctor.website" class="q-pt-sm">
              <section
                @click="handleClickOpenUrlSocialNetwork(doctor.website)"
                class="row q-gutter-x-sm items-center q-pa-sm relative-position"
                v-ripple
              >
                <img
                  src="iconos/icons-social-media/at.svg"
                  style="width: 25px"
                />
                <div class="text-subtitle2 ls-1 my-font-light">
                  {{ doctor.website }}
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
@import url('./DoctorPage.scss');
</style>
