import React, { Component } from "react"
import * as RN from "react-native"
import Axios from "axios"
import Config from '../../Config'

const serverURL = Config.SERVER_HOST_URL
const backgroundUrl = Config.BACKGROUND_URL

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
        const res = await Axios.post(serverURL + `login`, user)
        const id = res.data.user_id.toString()
        if (res.data.success) {
            await this.setState({userId: res.data.user_id})
            await RN.AsyncStorage.multiSet([['token', res.data.token], ['userId', id]])
            await RN.Alert.alert('Login Success!')
            await this.props.navigation.navigate('UserHome', {
                userId: this.state.userId
            })
        }
    }



    render() { 
        return ( 
            <RN.SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <RN.ImageBackground 
                source = {{uri: backgroundUrl}}
                style = {styles.backgroundImg} >
                    {!this.state.submitted &&
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
                            <RN.Button 
                                title={"Login"}
                                onPress={this.handleSubmit}/>
                        </RN.View>
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
    },
    inputField: {
        height: 50,
        width: 200,
        padding: 20,
        backgroundColor: 'white',
    },
    backgroundImg: {
        justifyContent: "center",
        width: RN.Dimensions.get("window").width,
        height: RN.Dimensions.get("window").height
    }
})