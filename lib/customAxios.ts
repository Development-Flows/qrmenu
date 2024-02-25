import axios from "axios";
import { getCookie } from 'cookies-next'

function setupAxios() {
	const baseUrl = "https://qr-menu-service.fly.dev/";

	axios.interceptors.request.use((config) => {
		const accessToken = getCookie("AccessToken")
		config.baseURL = baseUrl;
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	});

	axios.interceptors.response.use(
		(response) => {
			return response.data;
		},
		(err) => {
			if (err?.response?.status === 401) {
				// Token verify edilemedi, kullancıyı logout yap.
				try { 
				} catch (e) {
					console.log("logout olurken hata oluştu");
				}
			} else {
				return err;
			}
		}
	);
}

export default setupAxios;