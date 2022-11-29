import axios from 'axios'
import { server_api } from '../config'

export const instance = axios.create({
    withCredentials: true,
    baseURL: server_api,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})