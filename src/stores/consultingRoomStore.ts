import { defineStore } from 'pinia';
import { ref } from 'vue';

import { HttpClient } from 'src/HttpClient/http';

const route = 'specialty-centers';

const { http } = new HttpClient();

export const useConsultingRoomStore = defineStore('consultingRoomStore', () => {
  const consultingRoom = ref<any>(null);
  const consultingRooms = ref<any[]>([]);

  const getConsultingRoom = async (id: string) => {
    const { data } = await http.get<any>(`${route}/${id}`);
    consultingRoom.value = data;
    return data;
  };

  return {
    consultingRoom,
    consultingRooms,
    getConsultingRoom,
  };
});
