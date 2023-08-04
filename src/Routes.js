import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/Login";
import Cadastro from './Screens/Cadastro';
import CadastroServico from "./Screens/CadastroServico";
import CadastroProduto from "./Screens/CadastroProduto";
import Principal from "./Screens/Principal";

const Stack = createStackNavigator();

const Routes = () => {
	return(
		<Stack.Navigator initialRouteName="Login">
			<Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
			<Stack.Screen name="Principal" component={Principal} options={{headerShown: false}} />
			<Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}} />
			<Stack.Screen name="CadastroProduto" component={CadastroProduto} />
			<Stack.Screen name="CadastroServico" component={CadastroServico} />
		</Stack.Navigator>
	);
}

export default Routes;