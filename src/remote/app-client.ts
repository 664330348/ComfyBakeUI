import axios from "axios";

export const appClient = axios.create({
    baseURL: 'http://localhost:8080/comfyBake',
    headers:{
        'Accept':'application/json',
    },
    //prevents Axios from throwing an error if the response status is anything other than 200-900
    validateStatus:() => true
})