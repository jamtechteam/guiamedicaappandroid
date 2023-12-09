import { defineStore } from 'pinia';
import { IUser } from 'src/interfaces/IUser.interface';
import { ref } from 'vue';
import { HttpClient } from 'src/HttpClient/http';
import { IAuthLoginForm } from 'src/interfaces/IAuth.interface';
import { useAuthStore } from './authStore';

const route = 'users';
const { http } = new HttpClient();

export const useUserStore = defineStore('userStore', () => {
  const user = ref<IUser | null>(null);
  const users = ref<IUser[]>([]);

  const getUserAuth = async () => {
    const { data } = await http.get('user-auth/details');
    user.value = data;
  };

  const verifyAuth = async () => {
    const { data } = await http.post('auth/verify');
    return data;
  };

  const getUsers = async () => {
    const { data } = await http.get(route);
    users.value = data;
  };

  const authUser = async (user: IAuthLoginForm) => {
    const { data } = await http.post('auth/login', user);
    if (data) {
      useAuthStore().login(data.user, data.token);
    } else {
      return false;
    }
    return data;
  };

  return {
    authUser,
    user,
    users,
    getUserAuth,
    getUsers,
    verifyAuth,
  } as const;
});
