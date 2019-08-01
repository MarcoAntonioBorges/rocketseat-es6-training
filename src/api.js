import axio from 'axios';

//Realizando uma chamada a API do Github via axios
const api = axio.create({
  baseURL: 'https://api.github.com',
});

export default api;