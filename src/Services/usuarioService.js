import axios from "axios";
import Config from "../../Util/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";

class UsuarioService{
	async cadastrar(data){
		return axios({
			url: `${Config.API_URL}/cadastro.php`,
			method: "POST",
			timeout: Config.TMEOUT_REQUEST,
			data: data,
			headers: Config.HEADER_REQUEST
		}).then((response) => {
			return Promise.resolve(response)
		}).catch((error) => {
			return Promise.reject(error)
		})
	}

	async Login(data){
		return axios({
			url: `${Config.API_URL}/logar.php`,
			method: "POST",
			timeout: Config.TMEOUT_REQUEST,
			data: data,
			headers: Config.HEADER_REQUEST
		}).then((response) => {
			AsyncStorage.setItem('TOKEN', JSON.stringify(response.data.token))
			return Promise.resolve(response)
		}).catch((error) => {
			return Promise.reject(error)
		})
	}

	async LoginComToken(data){
		return axios({
			url: `${Config.API_URL}/logarToken.php`,
			method: "POST",
			timeout: Config.TMEOUT_REQUEST,
			data: data,
			headers: Config.HEADER_REQUEST
		}).then((response) => {
			if(response.data.token){
				AsyncStorage.setItem('TOKEN', JSON.stringify(response.data.token))
				return Promise.resolve(response)
			}else{
				return Promise.reject(response)
			}
		}).catch((error) => {
			return Promise.reject(error)
		})
	}
}

const userService = new UsuarioService();

export default userService