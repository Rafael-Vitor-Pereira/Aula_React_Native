import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Styles/MainStyle'
import userService from '../Services/usuarioService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingToken, setLoadingToken] = useState(true);

  const entrar = () => {
    let data = {
      email: email,
      senha: password
    }
    userService.Login(data)
    .then((response) => {
      setLoading(false)
      if(response.data.titulo == "Sucesso"){
        navigation.reset({
          index: 0,
          routes: [{name: "Home"}]
        });
      }else{
        Alert.alert(response.data.titulo, response.data.mensagem)
      }
    }).catch((error) => {
      //showDialog('Erro', 'Houve um erro inesperado', "ERRO")
      Alert.alert("Usuário não existe")
      setLoading(false)
    })
  }

  const logarComToken = (token) => {
    setLoadingToken(true)

    let data = {
      token: token
    }
    userService.LoginComToken(data)
    .then((response) => {
      if(response.data.titulo == "Sucesso"){
        navigation.reset({
          index: 0,
          routes: [{name: "Home"}]
        });
        setLoadingToken(false)
      }else{
        AsyncStorage.removeItem("TOKEN");
      }
    }).catch((error) => {
      setLoadingToken(false)
    })
  }

  const cadastrar = () => {
    navigation.navigate("Cadastro")
  }

  useEffect(() => {
    AsyncStorage.getItem("TOKEN").then((token) => {
      logarComToken(JSON.parse(token))
      setLoadingToken(false)
    }).catch((error) => {
      console.log(error)
    })
  }, []);

  return (
    <View style={styles.container}>
      {isLoadingToken && <Text style={{fontSize: 20}}>Só um minutinho... <ActivityIndicator size={20} color="#000" /></Text>}
      {!isLoadingToken &&
        <>
          <Text h3>Login do app</Text>
          <Input placeholder='E-mail' leftIcon={{type: 'font-awesome', name: 'envelope'}} onChangeText={value => setEmail(value)} keyboardType='email-address' />
          <Input placeholder='Sua senha' leftIcon={{type: 'font-awesome', name: 'key'}} onChangeText={value => setPassword(value)} secureTextEntry />

          {isLoading
            ? <ActivityIndicator size={32} color="#000" style={styles.loading} />
            : <Button icon={<Icon name="check" size={15} color="white" />} title=' Entrar' buttonStyle={specificStyle.button} onPress={() => entrar()} />
          }
          
          <Button icon={<Icon name="user" size={15} color="white" />} title=' Cadastrar' buttonStyle={specificStyle.button} onPress={() => cadastrar()} />
        </>
      }
    </View>
  );
}

const specificStyle = StyleSheet.create({
  button: {
    marginTop: 10,
  }
});