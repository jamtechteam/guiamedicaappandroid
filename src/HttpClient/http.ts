import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { useAuthStore } from 'src/stores/authStore';
import env from 'src/env';
import { Notify, Loading } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter();

type TResp<D = null> = {
  status: 'success' | 'error';
  data: D;
  message: string | undefined;
  code: string | number;
  statusCode: number;
};

export class HttpClient {
  /*  */
  public http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: env.apiUrl,
    });
    this.startInterceptors();
  }

  private startInterceptors(): void {
    // REQUEST
    this.http.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        useAuthStore().getStorage();
        config.url = `${config.url}`;
        config.headers = {
          Authorization: 'Bearer ' + useAuthStore().access_token,
        };

        return config;
      },
      (error: AxiosError) => {
        console.log(error, 'error request');
        return Promise.reject(error);
      }
    );

    // RESPONSE
    this.http.interceptors.response.use(
      async (response: AxiosResponse) => {
        const { status, data } = response;
        if (status === 200 || status === 201) return response;
        throw data;
      },
      (error: AxiosError) => {
        const response = error?.response;
        if (response) {
          const responseData = response.data as TResp;
          if (responseData.status === 'success') return responseData;
          else {
            const { statusCode, message } = responseData;
            console.log(statusCode, 'statusCode, message', message);
            if (statusCode === 401) {
              useAuthStore().logout();
              Loading.hide();
            } else {
              Notify.create({
                message: message,
                color: 'negative',
                position: 'bottom',
              });
            }
            throw message;
          }
        }

        // Unhandled error from api
        console.error('HTTP-ERROR-SERVER:', error.message);
        Notify.create({
          message: 'Error inesperado, posiblemente el API no esta disponible',
          color: 'negative',
          position: 'bottom',
        });
        Loading.hide();
        throw error;
      }
    );
  }
}
