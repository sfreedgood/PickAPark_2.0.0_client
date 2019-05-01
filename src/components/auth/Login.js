import React, { Component } from "react"
import * as RN from "react-native"
import Axios from "axios"
import Config from '../../../Config'

const serverURL = Config.SERVER_HOST_URL
const backgroundUrl = require("../../../assets/background.jpg")

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: "",
      password: "",
      userId: ''
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    const res = await Axios.post(serverURL + `/login`, user)
    const id = res.data.user_id.toString()
    if (res.data.success) {
      await this.setState({userId: res.data.user_id})
      await RN.AsyncStorage.multiSet([['token', res.data.token], ['userId', id]])
      await RN.Alert.alert('Login Success!')
      await this.props.navigation.navigate('UserHome', {
          userId: this.state.userId
      })
    } else {
      console.log(res.data.message)
      this.displayErrors(res.data.message)
    }
  }

  displayErrors = (errors) => {
    let errorsToDisplay = null
    if (Array.isArray(errors)) {
      errorsToDisplay = errors.map(error => {
        <RN.Text>{error}</RN.Text>
      })
    } else {
      errorsToDisplay = <RN.Text>{errors}</RN.Text>
    }
    return errorsToDisplay
  }

  render() { 
    return ( 
      <RN.SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <RN.ImageBackground 
          source = {backgroundUrl}
          style = {styles.backgroundImg} 
        >
          {!this.state.submitted &&
            <RN.KeyboardAvoidingView
              behavior="padding"
              enabled >
            <RN.View style={styles.loginForm}>
              <RN.TextInput 
                placeholder={"email"}
                style={styles.inputField}
                onChangeText={(email) => this.setState({email})}
              />
              <RN.TextInput 
                placeholder={"password"}
                style={styles.inputField}
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
              />
              
              <RN.View>
                {this.displayErrors}
              </RN.View>
              
              <RN.Text 
                style={styles.submit}
                onPress={this.handleSubmit}>
                Login
              </RN.Text>
            </RN.View>
            </RN.KeyboardAvoidingView>
          }
        </RN.ImageBackground>
      </RN.SafeAreaView>
    );
  }
}

const styles = RN.StyleSheet.create({
  loginForm: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "rgba(200, 200, 200, 0.7)",
      paddingTop: 50,
      marginBottom: 15,
  },
  inputField: {
      height: 50,
      width: 200,
      fontSize: 20,
      margin: 5,
      backgroundColor: "white",
  },
  submit: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    padding: 10,
    marginBottom: 25,
  },
  backgroundImg: {
    justifyContent: "center",
    width: RN.Dimensions.get("window").width,
    height: RN.Dimensions.get("window").height
  }
})