import { View, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import styles from '../Styles/MainStyle'
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import servicoService from '../Services/servicosService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CadastroServico = () => {
	const [titulo, setTitulo] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [descricao, setDescricao] = useState('');

	const [errorTitulo, setErrorTitulo] = useState(null);
	const [errorDescricao, setErrorDescricao] = useState(null);

	const validar = () => {
		let error = false
		setErrorTitulo(null)
		setErrorDescricao(null)

		if(titulo.length < 5){
			setErrorTitulo("Titulo deve conter no mínimo 5 caracteres")
			error = true
		}
		if(descricao.length < 20){
			setErrorDescricao("Descrição deve conter no mínimo 20 caracteres")
			error = true
		}

		return !error
	}

	async function getToken(){
		let userToken = ""

		await AsyncStorage.getItem("TOKEN").then((token) => {
      userToken = JSON.parse(token)
    }).catch((error) => {
      userToken = false
    })

		return userToken
	}

	const Salvar = async () => {
		if(validar()){
			let token = await getToken()

			console.log(token)

			if(token){
				let data = {
					token: token,
					titulo: titulo,
					descricao: descricao
				}
				servicoService.cadastrar(data)
				.then((response) => {
					// showDialog(response.data.titulo, response.data.mensagem, "SUCESSO")
					Alert.alert(response.data.titulo, response.data.mensagem)
					setLoading(false)
					setTitulo("")
					setDescricao("")
				}).catch((error) => {
					// showDialog('Erro', 'Houve um erro inesperado', "ERRO")
					Alert.alert('Erro', 'Ocorreu um erro inesperado')
					setLoading(false)
				})
			}else{
				Alert.alert('ERRO')
			}
		}
	}

	return (
		<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding": "height"} style={styles.container} keyboardVerticalOffset={80}>
			<ScrollView style={{width: '100%'}}>
				<Text>Cadastre-se</Text>
				<Input placeholder='Titulo do serviço' onChangeText={value => {setTitulo(value), setErrorTitulo(null)}} errorMessage={errorTitulo} value={titulo} />
				<Input placeholder='Descreva o serviço para explicar melhor' onChangeText={value => {setDescricao(value), setErrorDescricao(null)}} errorMessage={errorDescricao} value={descricao} />
				{isLoading
					? <ActivityIndicator size={32} color="#000" />
					: <>
							<Button icon={<Icon name='check' size={15} color="white" />} title=" Salvar" buttonStyle={styles.button} onPress={() => Salvar()} />
							<Button icon={<Icon name='stop' size={15} color="white" />} title=" Cancelar" buttonStyle={[styles.button, styles.cancelButton]} onPress={() => Cancelar()} />
						</>
				}
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default CadastroServico