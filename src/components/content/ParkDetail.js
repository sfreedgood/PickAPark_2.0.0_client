import React, { Component } from "react"
import * as RN from "react-native"
import Axios from "axios"
import Config from '../../Config'

const serverURL = Config.SERVER_HOST_URL
const backgroundUrl = require("../../assets/background.jpg")
const apiKey = Config.API_KEY
const urlBase = Config.URL_BASE
const urlCampsEndpoint = Config.URL_CAMPS_ENDPOINT
const urlParksEndpoint = Config.URL_PARKS_ENDPOINT

const urlEnd = `&api_key=${apiKey}`

export default class ParkDetail extends Component {
  state ={
    name: "",
    designation: "",
    description: "",
    directions: "",
    latLong: "",
    weather: "",
    url: "",
    parkCode: "",
    hasCampgrounds: false,
    isLoggedIn: false
  }

  componentDidMount = async () => {
    const parkCode = this.props.navigation.getParam('parkCode', 'no-code')
    const res = await Axios(urlBase + urlParksEndpoint + parkCode + urlEnd)
    console.log(res.data)
    const data = res.data.data[0]

    //checks session status and sets state to conditionally render user actions
    this.isLoggedIn()

    //sets state to conditionally render campground button only if campgrounds exist
    const camps = await Axios(urlBase + urlCampsEndpoint + parkCode + urlEnd)
    let hasCampgrounds
    if (camps.data.total > 0) {
      hasCampgrounds = true
    } else {
      hasCampgrounds = false
    }
      
    this.setState({
        name: data.name,
        designation: data.designation,
        description: data.description,
        directions: data.directionsInfo,
        latLong: data.latLong,
        weather: data.weatherInfo,
        url: data.url,
        parkCode: data.parkCode,
        hasCampgrounds,
    })
  }

  handleLink = () => {
    RN.Linking.canOpenURL(this.state.url)
    .then((supported) => {
      if (!supported) {
        console.log("Can't handle url: " + this.state.url);
      } else {
        return RN.Linking.openURL(this.state.url);
      }
    })
    .catch((err) => console.error('An error occurred', err))
  }

  handleSave = async (e) => {
    try {
      const nonsense = await RN.AsyncStorage.multiGet(['token', 'userId'])
      const token = nonsense[0][1]
      const userId = Number(nonsense[1][1])
      const parkToSave = {
          name: this.state.name,
          designation: this.state.designation,
          description: this.state.description,
          directions: this.state.directions,
          lat_long: this.state.latLong,
          weather: this.state.weather,
          url: this.state.url,
          park_code: this.state.parkCode,
          // hasCampgrounds: this.state.hasCampgrounds,
      }
      const res = await Axios.post(serverURL + `/users/${userId}/parks`, parkToSave, {
          headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
          }
      })
      res.status === 200 && this.setState({submitted: true})
    } catch (e) {
      console.log(e)
    }
  }

  isLoggedIn = async () => {
    const nonsense = await RN.AsyncStorage.multiGet(['token', 'userId'])
    const token = nonsense[0][1]
    const userId = Number(nonsense[1][1])
    if (token && userId) {
      this.setState(prevState => ({
        isLoggedIn: true
      }))
    }
  }

  render() {
    return(
      <RN.SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <RN.ImageBackground
          source = {backgroundUrl}
          style={styles.backgroundImg}>
          <RN.ScrollView>
          <RN.View style={styles.container}>
            <RN.Text style={styles.name}>
              {this.state.name}
            </RN.Text>

            <RN.Text style={styles.designation}>
              {this.state.designations}
            </RN.Text>

            {
              this.state.isLoggedIn &&
              <RN.Button
                title="add to favorites"
                onPress={() => this.handleSave()}
              />
            }
          
            <RN.View>
              <RN.Text style={styles.sectionHead}>
                { this.state.description && "Description" }
              </RN.Text>
              <RN.Text style={styles.content}>
                  {this.state.description}
              </RN.Text>
            </RN.View>
            
            <RN.View>
              <RN.Text style={styles.sectionHead}>
                { this.state.weather && "Weather" }
              </RN.Text>
              <RN.Text style={styles.content}>
                  {this.state.weather}
              </RN.Text>
            </RN.View>

            <RN.View>
              <RN.Text style={styles.sectionHead}>
                { this.state.directions && "Directions" }
              </RN.Text>
              <RN.Text style={styles.content}>
                  {this.state.directions}
              </RN.Text>
            </RN.View>

            {/* <RN.View>
                <RN.Text style={styles.latLong}>
                    {this.state.latLong}
                </RN.Text>
            </RN.View> */}
            {
              this.state.hasCampgrounds &&
              <RN.Text
                styles={styles.button}
                onPress={() => {
                  this.props.navigation.navigate('Campgrounds', {
                    parkCode: this.state.parkCode
                  })
                }} > View Campgrounds
              </RN.Text>
            }

            <RN.Text style={styles.sectionHead}>
              For More Information Visit:
            </RN.Text>
            <RN.TouchableOpacity
              hitSlop={{top: 30,left: 10,bottom: 10,right: 10}}
              onPress={this.handleLink}>
              <RN.Text style={styles.sectionHead}>
                {this.state.name} at NPS.gov
              </RN.Text>
            </RN.TouchableOpacity>
            <RN.Button 
              style={styles.button}
              title={"Back"}
              onPress={() => this.props.navigation.navigate('UserHome')}
            />   

          </RN.View>
          </RN.ScrollView>
        </RN.ImageBackground>
      </RN.SafeAreaView>
    )
  }
}

const styles = RN.StyleSheet.create({
  container: {
    backgroundColor: "rgba(200, 200, 200, 0.7)",
    marginBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },
  button: {
    fontSize: 15,
    marginBottom: 5,
    },
  name: {
      textAlign: "center",
      fontSize: 20,
      fontWeight: "600",
  },
  designation: {
      textAlign: "center",
      fontSize: 20,
      fontWeight: "600",
  },
  sectionHead: {
      marginTop: 5,
      fontSize: 15,
      textDecorationLine: "underline"
  },
  content: {
      padding: 1,
  },
  backgroundImg: {
      justifyContent: "center",
      width: RN.Dimensions.get("window").width,
      height: RN.Dimensions.get("window").height
  }
})