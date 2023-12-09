<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from 'src/stores/authStore'
import CDItem from './CDItem/CDItem.vue'
import { menuItems } from 'src/config/MenuItems'

const router = useRouter()
const authStore = useAuthStore()
const drawerItems = ref(menuItems)

const miniState = ref(true)
const modelValue = ref(true)

const logout = () => {
  router.push({ path: '/auth/login' })
  authStore.logout()
}

</script>

<template>
  <section class="c-drawe-style-container">
    <q-drawer
      v-model="modelValue"
      show-if-above

      :mini="miniState"

      :width="300"
      :mini-width="85"
      :breakpoint="500"
    >
      <q-scroll-area class="fit bg-primary text-white scroll-items-drawer">
          <q-list>
            <q-item>
              <q-item-section avatar>
                <img src="logos/logo3.svg" alt="logo_ticket_company">
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                -------
              </q-item-section>
            </q-item>
          </q-list>
          <q-list padding class="q-pt-md q-gutter-y-xs">
            <CDItem
              v-for="item in drawerItems"
              :key="item.id"
              v-bind="item"
            />
          </q-list>

          <q-icon
            @click="logout"
            name="img:menu-icon/logout.svg"
            class="btn-logout-drawer"
          />
      </q-scroll-area>
    </q-drawer>
  </section>
</template>

<style lang="scss" scoped>
  @import url('./CDrawer.scss');
</style>
