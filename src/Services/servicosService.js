import axios from "axios";
import Config from "../../Util/Config";

class ServicoService{
	async cadastrar(data){
		return axios({
			url: `${Config.API_URL}/cadastroServico.php`,
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
}

const servicoService = new ServicoService();

export default servicoService