import { View } from 'react-native'
import React, { useState } from 'react'
import styles from '../Styles/MainStyle';
import { Button, CheckBox, Icon, Input, Text } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';

const Cadastro = () => {
	const [cpf, setCpf] = useState(null);
	const [nome, setNome] = useState(null);
	const [email, setEmail] = useState(null);
	const [telefone, setTelefone] = useState(null);
	const [isSelected, setSelected] = useState(false);

	const [errorCpf, setErrorCpf] = useState(null);
	const [errorNome, seterrorNome] = useState(null);
	const [errorEmail, seterrorEmail] = useState(null);
	const [errorTelefone, seterrorTelefone] = useState(null);

	let CpfFiled = null;
	let TelField = null;

	const validar = () => {
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

		return !error;
	}

	const salvar = () => {
		if(validar()){
			console.log("Salvou");
		}
	}

	return (
		<View style={styles.container}>
			<Text h3>Cadastre-se</Text>

			<Input placeholder='E-mail' onChangeText={value => {setEmail(value), seterrorEmail(null)}} keyboardType='email-address' returnKeyType='done' errorMessage={errorEmail} />

			<Input placeholder='Nome' onChangeText={value => setNome(value)} returnKeyType='done' errorMessage={errorNome} />

			<View style={styles.containerMask}>
				<TextInputMask placeholder='CPF' type={'cpf'} value={cpf} onChangeText={value => {setCpf(value), setErrorCpf(null)}} keyboardType='number-pad' returnKeyType='done' style={styles.maskedInput} ref={(ref) => CpfFiled = ref} />
			</View>
			<Text style={styles.errorMessage}>{errorCpf}</Text>

			<View style={styles.containerMask}>
				<TextInputMask placeholder='Telefone' keyboardType='phone-pad' type={'cel-phone'} options={{maskType: 'BRL', withDDD: true, dddMask: '(99) '}} value={telefone} onChangeText={value => {setTelefone(value), seterrorTelefone(null)}}  style={styles.maskedInput} ref={(ref) => TelField = ref} />
			</View>
			<Text style={styles.errorMessage}>{errorTelefone}</Text>

			<CheckBox title="Eu aceito os termos de uso" checkedIcon="check" uncheckedIcon="square-o" checkedColor='green' uncheckedColor='red' checked={isSelected} onPress={() => setSelected(!isSelected)} />

			<Button icon={<Icon name='check' size={15} color="white" />} title=" Salvar" onPress={() => salvar()} />
		</View>
	)
}

export default Cadastro