// import * as AC from "./actionCreators" // AC abbr for ActionCreator
import * as AT from "./actionTypes" // AT abbr for ActionType
import { combineReducers } from "redux"

const initialParkState = {
  stateCode: "",
  parksLoaded: false,
  parkList: [],
  currentPark: ""
}

const initialCampState = {
  campsLoaded: false,
  campList: []
}

const initialUserState = {
  loginStatus: false,
  userParkList: [],
  userCampList: [],
}

const parks = (state = initialParkState, action) => {
  switch(action.type) {
    case AT.SET_STATE_CODE:
      const { stateCode } = action.payload
        return {
          ...state,
          stateCode: stateCode
        }
    case AT.PARKS_LOADED:
      const { bool } = action.payload
      return {
        ...state,
        parksLoaded: bool
      }
    case AT.SET_PARK_LIST:
      const { parkList } = action.payload
      console.log(parkList)
      return {
        ...state,
        parkList: parkList}
    case AT.SET_CURRENT_PARK:
      const { currentPark } = action.payload
      return {
        ...state,
        currentPark: currentPark
      }
    default:
      return state
  }
}

const camps = (state = initialCampState, action) => {
  switch(action.type) {
    case AT.CAMPS_LOADED:
      const { bool } = action.payload
      return {
        ...state,
        campsLoaded: bool}
    case AT.SET_CAMP_LIST:
      const { campList } = action.payload
      return {
        ...state,
        campList: campList}
    default:
      return state
  }
}

const userData = (state = initialUserState, action) => {
  switch(action.type) {
    case AT.LOGIN_STATUS:
      const { bool } = action.payload
      return {
        ...state,
        loginStatus: bool}
    case AT.SET_USER_CAMPS:
      const { userCampList } = action.payload
      return {
        ...state,
        userCampList: userCampList
        }
    case AT.SET_USER_PARKS:
      const {userParkList} = action.payload
      return {
        ...state,
        userParkList: userParkList
      }
    default:
      return state
  }

}

export default combineReducers({
  parks: parks,
  camps: camps,
  userData: userData
})