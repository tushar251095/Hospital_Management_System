import axios from 'axios';
const instance = axios.create({baseURL: 'http://localhost:3000/patient'});
instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Authorization'] = "Bearer"+" " + localStorage.getItem("token");
export default instance




