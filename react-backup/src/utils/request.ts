import axios from 'axios';

const baseURL = 'https://api.daxin.net/api';

export default axios.create({
  baseURL,
});