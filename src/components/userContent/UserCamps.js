import React, { Component } from "react"
import * as RN from "react-native"
import Axios from "axios"
import Config from '../../../Config'

const serverURL = Config.SERVER_HOST_URL || Config.LOCAL_HOST_URL
const backgroundUrl = require('../../../assets/background.jpg')

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

  componentDidUpdate = async () => {
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
              onPress={ () => this.deleteCamp(el.id) } />
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
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return(
      <RN.SafeAreaView>
        <RN.ImageBackground 
            source = {backgroundUrl}
            style = {styles.backgroundImg} >
          <RN.ScrollView style = {{paddingBottom: 20}}>
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
    backgroundColor: "rgba(200, 200, 200, 0.7)",
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