import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maskedInput: {
    flexGrow: 1,
    height: 40,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    borderStyle: 'solid',
    alignSelf: 'flex-start'
  },
  containerMask:{
    flexDirection: 'row',
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10
  },
  errorMessage:{
    alignSelf: 'flex-start',
    marginLeft: 15,
    color: '#f00',
    fontSize: 13
  },
  loading:{
    alignSelf: 'center',
    margin: 10
  }
});


export default styles;