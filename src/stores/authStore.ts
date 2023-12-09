import { defineStore } from 'pinia';
import { IUser } from 'src/interfaces/IUser.interface';
import { ref } from 'vue';
import { uid } from 'quasar';

import { HttpClient } from 'src/HttpClient/http';

const storageName = 'SESSION_USER';

const { http } = new HttpClient();

export const useAuthStore = defineStore('authStore', () => {
  const auth = ref<IUser | null>(null);
  const access_token = ref<string | null>(null);

  const saveStorage = (user: IUser, token: string) => {
    localStorage.setItem(
      storageName,
      JSON.stringify({
        user,
        token,
      })
    );
  };

  const getStorage = () => {
    const user = localStorage.getItem(storageName);
    if (user) {
      const { user: userStorage, token } = JSON.parse(user);
      auth.value = userStorage;
      access_token.value = token;
    }
  };

  const removeStorage = () => {
    localStorage.removeItem(storageName);
  };

  const login = (user: IUser, token: string) => {
    auth.value = user;
    access_token.value = token;
    saveStorage(user, token);
  };

  const logout = () => {
    auth.value = null;
    access_token.value = null;
    removeStorage();
  };

  const verifySessionLS = () => {
    getStorage();
    return {
      user: auth.value,
      token: access_token.value,
    };
  };

  const isLogged = () => {
    getStorage();
    return !!auth.value;
  };

  const saveTokenDispositive = async (dispositiveToken: string) => {
    const { data } = await http.post<any>(`notifications/dispositive`, {
      dispositiveToken,
    });
    return data;
  };

  // generar uidDispositive y guardar en el localStorage
  const generateUidDispositiveAndSaveStorage = () => {
    const uidDispositive = uid();
    localStorage.setItem('uidDispositive', uidDispositive);
    return uidDispositive;
  };

  // verificar si existe el uidDispositive en el localStorage y si no existe lo genera y lo guarda
  const verifyUidDispositive = () => {
    const uidDispositive = localStorage.getItem('uidDispositive');
    return uidDispositive;
  };

  return {
    auth,
    login,
    logout,
    getStorage,
    verifySessionLS,
    access_token,
    saveStorage,
    isLogged,
    saveTokenDispositive,
    generateUidDispositiveAndSaveStorage,
    verifyUidDispositive,
  } as const;
});
