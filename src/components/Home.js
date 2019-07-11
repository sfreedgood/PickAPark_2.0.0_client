//Dependencies
import React from 'react';
import * as RN from 'react-native';
import Axios from "axios"
import SearchableDropdown from 'react-native-searchable-dropdown';

//Components
import ParkList from "./content/ParkList"

//Static Assets
import StateList from '../../assets/states'
const states = StateList
const backgroundUrl = require("../../assets/background.jpg")

//Configuration
import Config from '../../Config'
const apiKey = Config.API_KEY
const urlBase = Config.URL_BASE
const urlStateParks = Config.URL_STATE_PARKS
const urlEnd = `&api_key=${apiKey}`

//Redux
import { connect } from "react-redux"

class Home extends React.Component {
  // state = {
  //   loggedIn: false
  // }

  componentDidMount = async () => {
    const nonsense = await RN.AsyncStorage.multiGet(['token', 'userId'])
    const token = nonsense[0][1]
    if (token) {
      this.props.loginStatus(true) // Redux-store equivalent to line 36
      // this.setState({loggedIn: true}) 
    }
  }

  handleSelect = (stateCode) => {
    console.log(stateCode)
    this.props.setStateCode(stateCode)
    // this.setState(prevState => ({
    //   selectedState: stateCode
    // }))
    this.loadData(stateCode)
  }

  loadData = async (stateCode) => {
    const res = await Axios(urlBase + urlStateParks + stateCode + urlEnd)
    if (res.status === 200) {
      const parkList = res.data.data
      this.props.setParkList(parkList)
      // this.setState(prevState => ({
      //   stateParks: parkList
      // }))
    } else {
      const response = await Axios.get('/parks/')
      const parkList = response.data
      this.props.setParkList(parkList)
      // this.setState(prevState => ({
      //   stateParks: parkList
      // }))
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
    console.log(this.props)
    return (
      <RN.SafeAreaView style={{flex: 1 }}>
        <RN.ImageBackground 
            source = {backgroundUrl}
            style = {styles.backgroundImg} >
          <RN.Text 
              style={styles.title} > 
            Select A State
          </RN.Text>
          {
            this.props.loggedIn &&
            <RN.Button
                style={styles.logout}
                title={"Logout"}
                onPress={ () => this.logout()} />
          }
          <SearchableDropdown
              onBlur={text => alert(text)}
              onItemSelect={item => this.handleSelect(item.id)}
              containerStyle={{ padding: 5 }}
              textInputStyle={styles.textInputStyle}
              itemStyle={styles.itemStyle}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight: 200 }}
              items={states}
              defaultIndex={2}
              placeholder="placeholder"
              resetValue={false}
              underlineColorAndroid="transparent" />
          <ParkList 
              parks={this.props.parks.parkList}
              navigation={this.props.navigation}/>
        </RN.ImageBackground>
      </RN.SafeAreaView>
    );
  }
}

//Styling
const styles = RN.StyleSheet.create({
  title: {
    fontSize: 50,
    backgroundColor: "rgba(200, 200, 200, 0.7)",
    width: RN.Dimensions.get("window").width,
    textAlign: "center",
    alignItems: "baseline"
    // justifyContent: "center"
  },
  backgroundImg: {
    // paddingTop: 25,
    // paddingBottom: 25,
    justifyContent: "flex-start",
    width: RN.Dimensions.get("window").width,
    height: RN.Dimensions.get("window").height
  },
  logout: {
    alignItems: "center",
    justifyContent: "flex-end"
  },
  itemStyle: {
    padding: 10,
    marginTop: 2,
    backgroundColor: '#ddd',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
  },
  textInputStyle: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: "rgba(200, 200, 200, 0.3)",
    borderRadius: 5,
  }
})

function mapStateToProps (state) {
  const { parks, camps, userData } = state
  console.log(parks)
  return { parks, camps, userData }
};

function mapDispatchToProps (dispatch) { //list of action-creators to be dispatched
  return {
    setParkList: (parkList) => dispatch({type: "SET_PARK_LIST", payload: {parkList}}), 
    setStateCode: (stateCode) => dispatch({type: "SET_STATE_CODE", payload: {stateCode}}),
    loginStatus: (loginStatus) => dispatch({type: "LOGIN_STATUS", payload: {bool: loginStatus}}),
  }
}

export default connect(
  // null,
  mapStateToProps,
  // null
  mapDispatchToProps
)(Home) //component goes here