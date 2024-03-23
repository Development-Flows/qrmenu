import axios from "axios";
import { getCookie } from 'cookies-next'

function setupAxios() {
	const baseUrl = "https://qr-menu-service.fly.dev/";

	axios.interceptors.request.use((config) => {
		const accessToken = getCookie("AccessToken")
		const memberFirmId = getCookie("firmId")
		config.baseURL = baseUrl;
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
			config.headers.firmId = memberFirmId ?? ''
		}
		return config;
	});

	axios.interceptors.response.use(
		(response) => {
			if(response?.config && response?.statusText!==undefined){
				return Promise.resolve(response.data);
			}else{
				return Promise.resolve(response);
			}
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