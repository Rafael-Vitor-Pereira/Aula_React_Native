import { ActivityIndicator, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import styles from '../Styles/MainStyle';
import { Button, CheckBox, Icon, Input, Text } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import userService from '../Services/usuarioService';
import { Button as PaperButton, Dialog, Portal, PaperProvider } from 'react-native-paper';
import CustomDialog from '../Components/CustomDialog'

const Cadastro = () => {
	const [cpf, setCpf] = useState(null);
	const [nome, setNome] = useState(null);
	const [senha, setSenha] = useState(null);
	const [email, setEmail] = useState(null);
	const [usuario, setUsuario] = useState(null);
	const [telefone, setTelefone] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [isSelected, setSelected] = useState(false);

	const [errorCpf, setErrorCpf] = useState(null);
	const [errorNome, seterrorNome] = useState(null);
	const [errorSenha, setErrorSenha] = useState(null);
	const [errorEmail, seterrorEmail] = useState(null);
	const [errorUsuario, setErrorUsuario] = useState(null);
	const [errorTelefone, seterrorTelefone] = useState(null);

	let CpfFiled = null;
	let TelField = null;

	const [visibleDialog, setVisibleDialog] = useState(false);

	const [tipo, setTipo] = useState(null);
	const [titulo, setTitulo] = useState(null);
	const [mensagem, setMensagem] = useState(null);

	const showDialog = (titulo, mensagem, tipo) => {
		setVisibleDialog(true)
		setTitulo(titulo)
		setMensagem(mensagem)
		setTipo(tipo)
	}

	const hideDialog = (status) => {
		setVisibleDialog(status);
	}

	const validar = () => {
		setLoading(true);

		let error = false;

		const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

		if(!regexEmail.test(String(email).toLowerCase())){
			seterrorEmail("Preencha seu E-mail corretamente!");
			error = true;
		}

		if(!CpfFiled.isValid()){
			setErrorCpf("Preencha seu CPF corretamente!");
			error = true;
		}

		if(!TelField.isValid()){
			seterrorTelefone("Preencha seu Telefone corretamente!");
			error = true;
		}

		if(senha == null || senha.length < 6){
			setErrorSenha("A senha deve conter no mínimo 6 caracteres");
			error = true;
		}

		if(usuario == null || usuario.length < 4){
			setErrorUsuario("O usuário deve conter no mínimo 4 caracteres");
			error = true;
		}

		return !error;
	}

	const salvar = () => {
		if(validar()){
			let data = {
				email: email,
				cpf: cpf,
				nome: nome,
				senha: senha,
				usuario: usuario,
				telefone: telefone
			}
			userService.cadastrar(data)
			.then((response) => {
				showDialog(response.data.titulo, response.data.mensagem, "SUCESSO")
				setLoading(false)
			}).catch((error) => {
				showDialog('Erro', 'Houve um erro inesperado', "ERRO")
				setLoading(false)
			})
		}
	}

	return (
		<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding": "height"} style={[styles.container, specificStyle.specificContainer]} keyboardVerticalOffset={80}>
			<PaperProvider>
				<View style={styles.container}>
					<Text h3>Cadastre-se</Text>

					<Input placeholder='E-mail' onChangeText={value => {setEmail(value), seterrorEmail(null)}} keyboardType='email-address' returnKeyType='done' errorMessage={errorEmail} />

					<Input placeholder='Nome Completo' onChangeText={value => setNome(value)} returnKeyType='done' errorMessage={errorNome} />

					<Input placeholder='Nome de usuário' onChangeText={value => setUsuario(value)} returnKeyType='done' errorMessage={errorUsuario} />

					<View style={styles.containerMask}>
						<TextInputMask placeholder='CPF' type={'cpf'} value={cpf} onChangeText={value => {setCpf(value), setErrorCpf(null)}} keyboardType='number-pad' returnKeyType='done' style={styles.maskedInput} ref={(ref) => CpfFiled = ref} />
					</View>
					<Text style={styles.errorMessage}>{errorCpf}</Text>

					<View style={styles.containerMask}>
						<TextInputMask placeholder='Telefone' keyboardType='phone-pad' type={'cel-phone'} options={{maskType: 'BRL', withDDD: true, dddMask: '(99) '}} value={telefone} onChangeText={value => {setTelefone(value), seterrorTelefone(null)}}  style={styles.maskedInput} ref={(ref) => TelField = ref} />
					</View>
					<Text style={styles.errorMessage}>{errorTelefone}</Text>

					<Input placeholder='Senha' onChangeText={value => {setSenha(value), setErrorSenha(null)}} errorMessage={errorSenha} secureTextEntry />

					<CheckBox title="Eu aceito os termos de uso" checkedIcon="check" uncheckedIcon="square-o" checkedColor='green' uncheckedColor='red' checked={isSelected} onPress={() => setSelected(!isSelected)} />

					{isLoading
						? <ActivityIndicator size={32} color='#000' style={styles.loading} />
						: <Button icon={<Icon name='check' size={15} color="white" />} title=" Salvar" onPress={() => salvar()} /> 			
					}
				</View>

				{visibleDialog && <CustomDialog titulo={titulo} mensagem={mensagem} tipo={tipo} visible={visibleDialog} onClose={hideDialog} />}
			</PaperProvider>
		</KeyboardAvoidingView>
	)
}

export default Cadastro