<script setup>
import CButton from 'src/components/CButton/CButton.vue';
import CInput from 'src/components/CInput/CInput.vue';
import { useUserStore } from 'src/stores/userStore';
import { useAuthStore } from 'src/stores/authStore';

import { ref, onMounted } from 'vue';
import { Loading } from 'quasar';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const authStore = useAuthStore();

const loginForm = ref({
  email: '',
  password: '',
});

const rules = useVuelidate(
  {
    email: { required, email },
    password: { required },
  },
  loginForm
);

const isPwd = ref(false);

const login = async () => {
  rules.value.$touch();
  if (rules.value.$invalid) {
    return;
  }
  try {
    Loading.show();
    const login = await userStore.authUser(loginForm.value);
    if (login) {
      router.push({ path: '/home' });
    }
  } catch (error) {
    console.log(error, 'error page');
  } finally {
    Loading.hide();
  }
};

onMounted(() => {
  const auth = authStore.verifySessionLS();
  console.log(auth, 'aaaaa');
  if (auth && auth.roles === 'user') {
    router.push({ path: '/home' });
  }
});
</script>

<template>
  <section class="flex flex-center style-container-login">
    <section class="style-card-container">
      <section class="row justify-center">
        <img
          src="logo1.png"
          alt="guiamedica_logo_1"
          class="col-12 style-img-logo-1"
        />
        <q-form
          @submit="login"
          ref="formRef"
          class="row q-gutter-y-lg col-12 q-pt-lg"
        >
          <c-input
            v-model="loginForm.email"
            labelTitle="Correo"
            placeholder="Ingrese su correo electronico"
            type="email"
            class="col-12"
            :error="rules.email.$error"
            error-message="Correo invalido"
            @blur="rules.email.$touch()"
          />

          <c-input
            v-model="loginForm.password"
            labelTitle="Contraseña"
            placeholder="Ingrese su contraseña"
            class="col-12"
            :iconAppend="isPwd ? 'visibility_off' : 'visibility'"
            @clickIconAppend="isPwd = !isPwd"
            :type="isPwd ? 'text' : 'password'"
          />

          <section class="row justify-center full-width">
            <c-button
              label="Olvidé mi contraseña"
              flat
              color="primary"
              labelColor="primary"
              class="text-bold col-12 no-shadow"
            />
          </section>

          <section class="col-12 flex flex-center row">
            <c-button
              label="Ingresar"
              class="col-xs-12 col-sm-12"
              @click="$refs.formRef.submit()"
            />
          </section>
        </q-form>
      </section>
    </section>
  </section>
</template>

<style lang="scss" scoped>
@import url('./LoginPage.scss');
</style>
