import axios from 'axios'

//in the production ther's no localhost, so we want to make the url dynamique
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"

const api = axios.create({
    baseURL: BASE_URL,
})

export default api;