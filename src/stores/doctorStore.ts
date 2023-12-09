import { defineStore } from 'pinia';
import { ref } from 'vue';

import { IDoctor } from 'src/interfaces/IDoctor.interface';

import { HttpClient } from 'src/HttpClient/http';

const route = 'doctors';

const { http } = new HttpClient();

export const useDoctorStore = defineStore('doctorStore', () => {
  const doctor = ref<IDoctor | null>(null);
  const doctors = ref<IDoctor[]>([]);

  const getDoctors = async (query?: any) => {
    const routeParams = `${route}?isEnabled=true&isPremium=${query.isPremium}&limit=${query.limit}&offset=${query.offset}&city=${query.city}`;
    const { data } = await http.get<IDoctor[]>(`${routeParams}`);
    doctors.value = data;
    return data;
  };

  const getDoctorsHomeCare = async (city?: string) => {
    if (city) {
      const { data } = await http.get<IDoctor[]>(
        `${route}/service/home-care?city=${city}`
      );
      doctors.value = data;
      return data;
    } else {
      const { data } = await http.get<IDoctor[]>(`${route}/service/home-care`);
      doctors.value = data;
      return data;
    }
  };

  const getDoctor = async (id: string) => {
    const { data } = await http.get<IDoctor>(`${route}/${id}`);
    doctor.value = data;
    return data;
  };

  const recommendedDoctors = async (city?: string) => {
    const { data } = await http.get<IDoctor[]>(
      `${route}/recommendeds/app?city=${city}`
    );
    doctors.value = data;
    return data;
  };

  const promotionDoctors = async (city?: string) => {
    const { data } = await http.get<IDoctor[]>(
      `${route}/promotions/app?citya=${city}`
    );
    doctors.value = data;
    return data;
  };

  const getDoctorBySpecialtyId = async (id: string, city: string) => {
    if (city) {
      const { data } = await http.get<IDoctor[]>(
        `${route}/specialty/${id}?city=${city}`
      );
      doctors.value = data;
      return data;
    }
    const { data } = await http.get<IDoctor[]>(`${route}/specialty/${id}`);
    doctors.value = data;
    return data;
  };

  return {
    doctor,
    doctors,
    getDoctor,
    getDoctors,
    recommendedDoctors,
    getDoctorBySpecialtyId,
    getDoctorsHomeCare,
    promotionDoctors,
  } as const;
});
