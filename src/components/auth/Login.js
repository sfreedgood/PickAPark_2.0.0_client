//Dependencies
import React, { Component } from "react"
import * as RN from "react-native"
import Axios from "axios"
//Configuration
import Config from '../../../Config'
const serverURL = Config.SERVER_HOST_URL || Config.LOCAL_HOST_URL

//Static Assets
const backgroundUrl = require("../../../assets/background.jpg")

//Component
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
    
    if (res.data.success) {
      const id = res.data.user_id.toString()
      await this.setState({userId: res.data.user_id})
      await RN.AsyncStorage.multiSet([['token', res.data.token], ['userId', id]])
      await RN.Alert.alert('Login Success!')
      await this.props.navigation.navigate('UserHome', {
          userId: this.state.userId
      })
    } else {
      this.displayErrors(res.data.message)
      this.setState(prevState => ({
        errors: true
      }))
    }
  }

  displayErrors = (errors) => {
    let errorsToDisplay = null
    if (Array.isArray(errors)) {
      errorsToDisplay = errors.map(error => {
        <RN.Text style={styles.errorText}>{error}</RN.Text>
      })
    } else {
      errorsToDisplay = <RN.Text style={styles.errorText}>{errors}</RN.Text>
    }
    this.setState(prevState => ({
      errorsToDisplay
    }))
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
                          
            {
              this.state.errors &&
                <RN.View style={styles.error}>
                  {this.state.errorsToDisplay}
                </RN.View>
            }
              
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
  },
  error: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "rgba(255, 0, 0, 0.8)"
  },
  errorText: {
    fontSize: 25,
    fontWeight: "700",
  }
})