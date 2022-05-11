import * as React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Image, Switch } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
 
const SignIn = ({ onSignIn }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);

  const submit = () => {
    onSignIn({ username, password })
  }

  const toggleRememberMe = async value => {
    //await AsyncStorage.clear()
    setRememberMe(value)
    if (value) {
      rememberUser();
    } else {
      forgetUser();
    }
  }

  const rememberUser = async () => {
    try {
      await AsyncStorage.setItem('usernameKey', username);
    } catch (error) {
      console.log(error)
    }
  };

  // const getRememberedUser = async () => {
  //   try {
  //     const username = await AsyncStorage.getItem('usernameKey');
  //     // const password = await AsyncStorage.getItem('passwordKey');
  //     if (username !== null) {
  //       // We have username!!
  //       return username;
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };

  const forgetUser = async () => {
      try {
        await AsyncStorage.removeItem('usernameKey');
        // await AsyncStorage.clear()
      } catch (error) {
        console.log(error)
      }
  };

  return (
    <View style={styles.container}>
      <Text>Public Sign In Screen</Text>
      <Image style={styles.image} source={require("../../assets/images/FreeWriteFin1-e1477355282122.png")} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="username"
          placeholderTextColor = "#fff"
          onChangeText={username => setUsername(username)}
          value={username}
          />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="password"
          placeholderTextColor="#fff"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
          value={password}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn}>
        <Button color="#fff" title="Sign In" onPress={submit} />
      </TouchableOpacity>

      <View style={{marginRight: 125, flexDirection: 'row'}}>
        <Switch
          style={{marginTop:20}}
          value={rememberMe}
          onValueChange={(value) => toggleRememberMe(value)}
        />
        <Text style={styles.remember_me}>Remember Me</Text>
      </View>

      <View style={{marginTop: 50, marginRight: 10, flexDirection: 'row'}}>
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.sign_up}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
    width: 75,
    height: 75,
  },
 
  inputView: {
    backgroundColor: "#7e3f984a",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    color: "#fff"
  },
 
  forgot_button: {
    height: 30,
    marginTop: 30,
    color:"#fff"
  },

  sign_up: {
    height: 30,
    marginTop: 30,
    marginLeft:100,
    color:"#fff"
  },

  remember_me: {
    marginTop: 27,
    marginLeft: 10,
    color:"#fff"
  },
 
  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 40,
    backgroundColor: "#7e3f98"
  },
});
 
export default SignIn;