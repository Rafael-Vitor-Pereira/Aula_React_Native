import axios from "axios";

class UsuarioService{
	async cadastrar(data){
		return axios({
			url: "http://192.168.0.106:80/Curso_RN/cadastro.php",
			method: "POST",
			timeout: 5000,
			data: data,
			headers: {
				Accept: 'application/json'
			}
		}).then((response) => {
			return Promise.resolve(response)
		}).catch((error) => {
			return Promise.reject(error)
		})
	}
}

const userService = new UsuarioService();

export default userService