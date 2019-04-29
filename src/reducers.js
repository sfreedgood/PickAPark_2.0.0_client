import * as AC from "./actionCreators" // AC abbr for ActionCreator
import * as AT from "./actionTypes" // AT abbr for ActionType

AT.

const initialState = {
  [AC.loginStatus]: false,
}

function pickAPark(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  switch(action.type) {
    case AT.LOGIN_STATUS:
      return {...state, loginStatus: action.bool}
    case AT.CAMPS_LOADED:
      return {...state, campsLoaded: action.bool}
    case AT.PARKS_LOADED:
      return {...state, parksLoaded: action.bool}
    case AT.SET_CAMP_LIST:
      return {...state, setCampList: action.campList}
    case AT.SET_PARK_LIST:
      return {...state, setParkList: action.parkList}
    case AT.SET_STATE_CODE:
      return {...state, setStateCode: action.stateCode}
    case AT.SET_USER_CAMPS:
      return {...state, setUserCamps: action.userCampList}
    case AT.SET_USER_PARKS:
      return {...state, setUserParks: action.userParkList}
    case AT.SET_CURRENT_PARK:
      return {...state, currentPark: action.currentPark}
    default:
      return state
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  return state
}