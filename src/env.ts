// este archivo es para configurar las variables de entorno

const isProduction = true;

const devApiUr = 'http://192.168.1.131:3000/api/';
const prodApiUr = 'https://api.gmedicavzla.online/api/';

export default {
  apiUrl: isProduction ? prodApiUr : devApiUr,
};
