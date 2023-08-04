import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../Styles/MainStyle'

const Cadastrar = ({navigation}) => {
	function cadastrarServico(){
		navigation.navigate("CadastroServico");
	}

	function cadastrarProduto(){
		navigation.navigate("CadastroProduto");
	}

	return (
		<View style={styles.container}>
			<Text>O que você quer cadastrar?</Text>
			<Button icon={<Icon name='child' size={15} color="white" />} title=" Cadastrar Serviço" buttonStyle={styles.button} onPress={() => cadastrarServico()} />
			<Button icon={<Icon name='shopping-bag' size={15} color="white" />} title=" Cadastrar Produto" buttonStyle={styles.button} onPress={() => cadastrarProduto()} />
		</View>
	)
}

export default Cadastrar