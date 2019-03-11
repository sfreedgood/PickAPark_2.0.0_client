import React, { Component } from "react"
import * as RN from "react-native"
import Axios from "axios"
import Config from '../../Config'

const serverURL = Config.SERVER_HOST_URL
const backgroundUrl = Config.BACKGROUND_URL

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: "",
            email: "",
            password: "",
            submitted: false
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            user_name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        }
        const res = await Axios.post(serverURL + 'signup', user)
        res.status === 200 && this.setState({submitted: true})
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
                                placeholder={"name"}
                                style={styles.inputField}
                                onChangeText={(name) => this.setState({name})}
                            />
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
                                title={"Signup"}
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
        paddingBottom: 200,
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