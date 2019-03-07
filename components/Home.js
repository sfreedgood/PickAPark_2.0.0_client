import React from 'react';
import * as RN from 'react-native';
import Axios from "axios"
import SearchableDropdown from 'react-native-searchable-dropdown';
import StateList from '../assets/states'
import ParkList from "./content/ParkList"
import Config from '../Config'

const states = StateList
const backgroundUrl = Config.BACKGROUND_URL
const apiKey = Config.API_KEY
const urlBase = Config.URL_BASE
const urlStateParks = Config.URL_STATE_PARKS

const urlEnd = `&api_key=${apiKey}`
export default class Home extends React.Component {
    state = {
        loggedIn: false
    }

    componentDidMount = async () => {
        const nonsense = await RN.AsyncStorage.multiGet(['token', 'userId'])
        const token = nonsense[0][1]
        if (token) {
          this.setState({
              loggedIn: true
          })
        }
    }

    handleSelect = (stateCode) => {
        this.setState(prevState => ({
            selectedState: stateCode
        }))
        this.loadData(stateCode)
    }

    loadData = async (stateCode) => {
        const res = await Axios(urlBase + urlStateParks + stateCode + urlEnd)
        if (res.status === 200) {
            const parkList = res.data.data
            this.setState(prevState => ({
                stateParks: parkList
            }))
        } else {
            const response = await Axios.get('/parks/')
            const parkList = response.data
            this.setState(prevState => ({
                stateParks: parkList
            }))
        }
    }

    logout = async () => {
        try {
            await RN.AsyncStorage.multiRemove(['token', 'userId'])
            RN.Alert.alert('Logout Successful')
            this.props.navigation.navigate('Landing')
        } catch (e) {
            console.log(e)
        }
    }

  render() {
    return (
        <RN.SafeAreaView style={{flex: 1 }}>

      <RN.View style={styles.container}>
        <RN.ImageBackground 
            source = {{uri: backgroundUrl}}
            style = {styles.backgroundImg} >
            
            <RN.Text 
                style={styles.title} > 
                Select A State
            </RN.Text>

            {
                this.state.loggedIn &&
                    <RN.Button
                        style={styles.logout}
                        title={"Logout"}
                        onPress={ () => this.logout()}
                    />
            }
            
            <SearchableDropdown
                onBlur={text => alert(text)}
                onItemSelect={item => this.handleSelect(item.id)}
                containerStyle={{ padding: 5 }}
                textInputStyle={{
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                }}
                itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: '#bbb',
                    borderWidth: 1,
                    borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={states}
                defaultIndex={2}
                placeholder="placeholder"
                resetValue={false}
                underlineColorAndroid="transparent"
            />

            <ParkList parks={this.state.stateParks}
                      navigation={this.props.navigation}/>

        </RN.ImageBackground>
      </RN.View>
      </RN.SafeAreaView>

    );
  }
}

const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        // marginTop: 20,
        fontSize: 50,
        textAlign: "center",
    },
    backgroundImg: {
        paddingTop: 25,
        paddingBottom: 25,
        justifyContent: "flex-start",
        width: RN.Dimensions.get("window").width,
        height: RN.Dimensions.get("window").height
    },
    logout: {
        alignItems: "center",
        justifyContent: "flex-end"
    }
})