import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/Routes";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "./Util/Config";

const App = () => {
  return(
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}

function defineInterceptor(){
  axios.interceptors.response.use(response => {
    return response
  }, err => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config
      if(err.response.status == 401 && err.config && !err.config._retry){
        originalReq._retry = true
        AsyncStorage.getItem("TOKEN").then((token) => {
          let res = axios.put(`${Config.API_URL}/refreshToken.php`, {oldToken: token})
          .then((res) => {
            AsyncStorage.setItem("TOKEN", res.data.token)
            originalReq.headers["Authorization"] = `Bearer ${res.data.token}`
            return axios(originalReq)
          })
          resolve(res)
        })
      }else{
        reject(err)
      }
    })
  })
}

export default App;