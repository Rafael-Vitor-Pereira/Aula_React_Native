import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/Login";
import Home from "./Screens/Principal";

const Stack = createStackNavigator();

const Routes = () => {
	return(
		<Stack.Navigator initialRouteName="Login">
			<Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
			<Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
		</Stack.Navigator>
	);
}

export default Routes;