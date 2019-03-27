import React, { Component } from "react"
import * as RN from "react-native"
import Axios from "axios"
import Config from '../../Config'

const serverURL = Config.SERVER_HOST_URL
const backgroundUrl = require('../../assets/background.jpg')

export default class UserParks extends Component {
  state = {
    data: [],
    loaded: false
  }

  componentDidMount = async () => {
    try{
      const nonsense = await RN.AsyncStorage.multiGet(['token', 'userId'])
      const token = nonsense[0][1]
      const userId = Number(nonsense[1][1])

      const res = await Axios.get(serverURL + `/users/${userId}/parks`, {
        headers: {
          Authorization: 'Bearer ' + token //the token is a variable which holds the token
        }
      })
      this.setState({
        loaded: true,
        data: res.data.userParks
      })
    } catch(e) {
      console.log(e)
    }
  }

  deletePark = async (parkId) => {
    try {
      const nonsense = await RN.AsyncStorage.multiGet(['token', 'userId'])
      const token = nonsense[0][1]
      const userId = Number(nonsense[1][1])

      const res = await Axios.delete(serverURL + `/users/${userId}/parks/${parkId}`, {
        headers: {
          Authorization: 'Bearer ' + token //the token is a variable which holds the token
        }
      })
      RN.Alert.alert(res.data.message)
      this.setState({
        deleted: true
      })
    } catch (e) {
      console.log(e)
    }
  }

  renderUserParks = (parkData) => {
    const parkList = parkData.map((el, key) => {
      return (
        <RN.View 
            style={styles.parkContainer}
            id={el.parkCode}
            key={key} >
          <RN.Text style={styles.parkName}>
            {el.name}
          </RN.Text>
          <RN.Button
              title={"Delete"}
              onPress={ () => this.deletePark(el.id) } />
          <RN.Text style={styles.parkDescription}>
            {el.description}
          </RN.Text>
        </RN.View>
      )
    })
    return parkList
  }

  render() {
    return(
      <RN.SafeAreaView>
        <RN.ImageBackground 
            source = {backgroundUrl}
            style = {styles.backgroundImg} >
          <RN.ScrollView style = {{paddingBottom: 20}}>
            {this.state.loaded && this.renderUserParks(this.state.data)}
          </RN.ScrollView>
        </RN.ImageBackground>
      </RN.SafeAreaView>
    )
  }
}

const styles = RN.StyleSheet.create({
  parkContainer: {
    padding: 2,
    backgroundColor: "rgba(200, 200, 200, 0.7)",
  },
  parkName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  backgroundImg: {
    justifyContent: "center",
    width: RN.Dimensions.get("window").width,
    height: RN.Dimensions.get("window").height,
    opacity: 50
  },
  parkDescription: {

  }
})