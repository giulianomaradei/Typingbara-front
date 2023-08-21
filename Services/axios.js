import axios from 'axios';

// Configurações padrão para a instância do Axios
const axiosInstance = axios.create({
  baseURL: 'https://local.lo/api', // Coloque o URL base da sua API aqui
  headers: {
    'Content-Type': 'application/json',
    // Outros headers comuns podem ser definidos aqui
  }
});

// Interceptor para adicionar o token aos headers
axiosInstance.interceptors.request.use(config => {
  const token = 'seu_token_aqui'; // Substitua pelo token real
  if (token && !config.url.startsWith('/auth')) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
