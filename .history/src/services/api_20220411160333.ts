import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhos:3000'
})