import React, { Component } from "react"
import * as RN from "react-native"
import Axios from "axios"
import Config from '../../../Config'

const serverURL = Config.SERVER_HOST_URL
const backgroundUrl = Config.BACKGROUND_URL
const apiKey = Config.API_KEY
const urlBase = Config.URL_BASE
const urlCampsEndpoint = Config.URL_CAMPS_ENDPOINT

const urlEnd = `&api_key=${apiKey}`

export default class Campgrounds extends Component {
    state = { 
        data: false,
        campList: []
    }

    componentDidMount = async () => {
        const parkCode = this.props.navigation.getParam('parkCode', 'no-code')
        const res = await Axios(urlBase + urlCampsEndpoint + parkCode + urlEnd)

        //checks session status and sets state to conditionally render user actions
        this.isLoggedIn()

        this.setState({
            campList: res.data,
            data: true
        })
    }

    handleSave = async (id) => {
        let camp = this.filterCampById(id)
        try {
            const nonsense = await RN.AsyncStorage.multiGet(['token', 'userId'])
            const token = nonsense[0][1]
            const userId = Number(nonsense[1][1])
            const campToSave = {
                id: camp.id,
                park_code: camp.parkCode,
                description: camp.description,
                name: camp.name,
                lat_long: camp.latLong,
                weather_overview: camp.weatherOverview,
                directions_url: camp.directionsUrl,
                directions_overview: camp.directionsOverview,
                park_id: camp.park_id
            }

            const res = await Axios.post(serverURL + `/users/${userId}/camps`, campToSave, {
                headers: {
                    Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            })
            res.status === 200 && this.setState({submitted: true})
        } catch (e) {
            console.log(e)
        }
    }

    filterCampById = (id) => {
        let campList = this.state.campList
        const camp = campList.data.find(el => {
            if (el.id === id) {
                return el
            }
        })

        return camp
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

    renderCampList = () => {
        const data = this.state.campList
        let campList;
        if (data.total > 0) {
            campList = data.data.map((el, key) => {
                return (
                    <RN.View 
                            style={styles.parkContainer}
                            id={el.id}
                            key={key} >
                        <RN.Text style={styles.sectionHead}>
                            {el.name || "We apologize, this information is not currently available"}
                        </RN.Text>
                        {this.state.isLoggedIn &&
                            <RN.Button
                                title={"Add to Favorites"}
                                onPress={ () => this.handleSave(el.id) }
                            />
                        }
                        <RN.Text style={styles.content}>
                            {el.description || "We apologize, this information is not currently available"}
                        </RN.Text>
                        <RN.Text style={styles.content}>
                            {el.directionsOverview || "We apologize, this information is not currently available"}
                        </RN.Text>
                        <RN.Text style={styles.content}>
                            {el.weatherOverview || "We apologize, this information is not currently available"}
                        </RN.Text>
                        <RN.Button
                            title={`${el.name} at NPS.gov`} 
                            onPress={ () => {
                                RN.Linking.canOpenURL(el.directionsUrl)
                                .then((supported) => {
                                    if (!supported) {
                                    console.log("Can't handle url: " + el.directionsUrl);
                                    } else {
                                    return RN.Linking.openURL(el.directionsUrl);
                                    }
                                })
                                .catch((err) => console.error('An error occurred', err))
                            }} >
                            {el.directionsUrl}
                        </RN.Button>
                    {/* <RN.Text>{key}: {el.name}</RN.Text> */}
                        
                    </RN.View>
                )
            })
        }
        return campList
    }

    render() {
        return ( 
            <RN.SafeAreaView style={{flex: 1, backgroundColor: 'gray'}}>
                <RN.ImageBackground 
                    source = {{uri: backgroundUrl}}
                    style = {styles.backgroundImg} >
                    <RN.ScrollView>
                        <RN.Text style={styles.name}>Campgrounds</RN.Text>
                        {
                            this.state.data ?
                                this.renderCampList() : 
                                <RN.Text style={styles.noData}>
                                    That information is not available at this time, we appologize for the inconenvience
                                </RN.Text>
                        }
                        <RN.Button
                            title={"Back"}
                            onPress={() => this.props.navigation.navigate('UserHome')}
                        />
                    </RN.ScrollView>
                </RN.ImageBackground>
            </RN.SafeAreaView>
         )
    }
}
 
const styles = RN.StyleSheet.create({
    name: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "600",
        paddingTop: 25,
    },
    noData: {
        marginTop: 25,
        fontSize: 20,
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