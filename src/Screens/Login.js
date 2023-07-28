import { useState } from 'react';
import { View } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Styles/MainStyle'

export default function Login({navigation}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const entrar = () => {
    navigation.reset({
			index: 0,
			routes: [{name: "Home"}]
		});
  }

  return (
    <View style={styles.container}>
      <Text h3>Login do app</Text>
      <Input placeholder='E-mail' leftIcon={{type: 'font-awesome', name: 'envelope'}} onChangeText={value => setEmail(value)} keyboardType='email-address' />
      <Input placeholder='Sua senha' leftIcon={{type: 'font-awesome', name: 'key'}} onChangeText={value => setPassword(value)} secureTextEntry />
      <Button icon={<Icon name="check" size={15} color="white" />} title=' Entrar' onPress={() => entrar()} />
    </View>
  );
}