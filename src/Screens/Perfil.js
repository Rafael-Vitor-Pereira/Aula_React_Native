import { Alert, Text, View } from "react-native";
import { Button } from "react-native-elements";
import styles from '../Styles/MainStyle'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Perfil({navigation}){
	const Logout = (navigation) => {
    AsyncStorage.removeItem("TOKEN").then(() => {
			navigation.reset({
				index: 0,
				routes: [{name: "Login"}]
			})
		}).catch(() => {
			Alert.alert("Erro ao sair")
		});
  }

  return(
    <View style={styles.container}>
      <Text>Perfil</Text>
      <Button title="Sair" onPress={() => Logout()} />
    </View>
  );
}