import React, { Component } from "react"
import * as RN from "react-native"
import Axios from "axios"
require('dotenv').config()

const serverURL = process.env.SERVER_HOST_URL
const backgroundUrl = process.env.BACKGROUND_URL

export default class UserCamps extends Component {
    state = {
        data: [],
        loaded: false
    }

    componentDidMount = async () => {
        try{
            const nonsense = await RN.AsyncStorage.multiGet(['token', 'userId'])
            const token = nonsense[0][1]
            const userId = Number(nonsense[1][1])

            const res = await Axios.get(serverURL + `/users/${userId}/camps`, {
                headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            })
            this.setState({
                loaded: true,
                data: res.data.userCamps
            })
        } catch(e) {
            console.log(e)
        }
    }

    renderUserCamps = (campData) => {
        const campList = campData.map((el, key) => {
            return (
                <RN.View 
                        style={styles.campContainer}
                        id={el.campCode}
                        key={key} >
                    <RN.Text style={styles.campName}>
                        {el.name}
                    </RN.Text>
                    <RN.Button
                        title={"Delete"}
                        onPress={ () => this.deleteCamp(el.id) }
                    />
                    <RN.Text style={styles.campDescription}>
                        {el.description}
                    </RN.Text>
    
                </RN.View>
            )
        })
        return campList
    }

    deleteCamp = async (campId) => {
        try {
            const nonsense = await RN.AsyncStorage.multiGet(['token', 'userId'])
            const token = nonsense[0][1]
            const userId = Number(nonsense[1][1])

            const res = await Axios.delete(serverURL + `/users/${userId}/camps/${campId}`, {
                headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            })

            RN.Alert.alert(res.data.message)
            this.props.navigation.navigate("UserHome") 
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return(
            <RN.SafeAreaView>
                <RN.ImageBackground 
                    source = {{uri: backgroundUrl}}
                    style = {styles.backgroundImg} >
                    <RN.ScrollView>
                        {this.state.loaded && this.renderUserCamps(this.state.data)}
                    </RN.ScrollView>
                </RN.ImageBackground>
            </RN.SafeAreaView>
        )
    }
}

const styles = RN.StyleSheet.create({
    campContainer: {
        padding: 2,
    },
    campName: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "600",
    },
    backgroundImg: {
        justifyContent: "center",
        width: RN.Dimensions.get("window").width,
        height: RN.Dimensions.get("window").height
    },
    campDescription: {

    }
})