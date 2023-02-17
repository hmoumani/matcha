import apiClient from "@/modules/apiClient";

export default async () => {
	const response = await apiClient.get('/auth/getUserToken');
	const token = response.data.message.token;
    return token;
};