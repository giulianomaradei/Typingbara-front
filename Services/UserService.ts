import axiosInstance from "./axios";

export default {
    async login(data: any){
        try{
            const response = await axiosInstance.post('/auth/login', data);
            return response.data.token;
        }catch(err){
            console.error(err);
        }
    },

    async register(data: any){
        try{
            const response = await axiosInstance.post('/auth/register', data);
            return response.data.token;
        }catch(err){
            console.error(err);
        }
    }
}