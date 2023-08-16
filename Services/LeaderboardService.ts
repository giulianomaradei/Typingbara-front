import { response } from "./ResponseType";
const { $axios } = useNuxtApp(); 

export const LeaderboardService = {

    async getRecords(skip: number, take: number): Promise<response> {
        try {
            const response = await $axios.get('/api/records', {
                params: {
                    skip,
                    take,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}