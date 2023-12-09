
// este archivo es para configurar las variables de entorno

const isProduction = true

const devApiUr = 'http://localhost:3000'
const prodApiUr = 'http://localhost:3000/api'

export default {
  apiUrl: isProduction ? prodApiUr : devApiUr
}
