import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/HomePage/HomePage.vue'),
        name: 'home',
      },
      {
        path: '/favorites',
        component: () => import('pages/FavoritesPage/FavoritesPage.vue'),
        name: 'favorites',
      },
      {
        path: '/doctor/:id',
        component: () => import('pages/DoctorPage/DoctorPage.vue'),
        name: 'doctor-detail',
      },
      {
        path: '/recommended',
        component: () => import('pages/RecommendedPage/RecommendedPage.vue'),
        name: 'recommended',
      },
      {
        path: '/contact',
        component: () => import('pages/ContactPage/ContactPage.vue'),
        name: 'contact',
      },
      {
        path: '/services',
        component: () => import('pages/ServicesPage/ServicesPage.vue'),
        name: 'services',
      },
      {
        path: '/services/doctors/home-care',
        component: () =>
          import('pages/DoctorPage/HomeCarePage/HomeCarePage.vue'),
        name: 'home-care',
      },
      {
        path: '/services/category/:id',
        component: () =>
          import(
            'pages/ServicesPage/ServicesByCategoryPage/ServicesByCategoryPage.vue'
          ),
        name: 'services-by-category',
      },
      {
        path: '/categories',
        component: () => import('pages/CategoriesPage/CategoriesPage.vue'),
        name: 'categories',
      },
      {
        path: '/categories/specialty/:id/doctors',
        component: () =>
          import(
            'pages/SpecialtiesPage/SpecialtyDoctorsPage/SpecialtyDoctorsPage.vue'
          ),
        name: 'specialty-doctors',
      },
      // consultorios
      {
        path: '/consulting-room/:id',
        component: () =>
          import('pages/ConsultingRoomPage/ConsultingRoomPage.vue'),
        name: 'consulting-room',
      },
      // promotion
      {
        path: '/promotion',
        component: () => import('pages/PromotionPage/PromotionPage.vue'),
        name: 'promotion',
      },
    ],
  },
  {
    path: '/configuration/location',
    component: () => import('pages/LocationConfigPage/LocationConfigPage.vue'),
    name: 'location-config',
  },
  {
    path: '/configuration/location/internal',
    component: () => import('pages/LocationConfigPage/internalConfigPage/LocationConfigPageInternal.vue'),
    name: 'location-config-internal',
  },
  {
    path: '/auth/login',
    component: () => import('pages/LoginPage/LoginPage.vue'),
  },
  {
    path: '/',
    redirect: '/home',
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
