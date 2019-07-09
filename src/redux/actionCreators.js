// Action Creators
function loginStatus(bool) {
  return {type: LOGIN_STATUS, bool: bool}
}

function setStateCode(stateCode) {
  return {type: SET_STATE_CODE, stateCode: stateCode}
}

function setParkList(parkList) {
  return {type: SET_PARK_LIST, parkList: parkList}
}

function setCampList(campList) {
  return {type: SET_CAMP_LIST, campList: campList}
}

function campsLoaded(bool) {
  return {type: CAMPS_LOADED, bool: bool}
}

function parksLoaded(bool) {
  return {type: PARKS_LOADED, bool: bool}
}

function setUserCamps(userCampList) {
  return {type: SET_USER_CAMPS, userCampList: userCampList}
}

function setUserParks(userParkList) {
  return {type: SET_USER_PARKS, userParkList: userParkList}
}

function setCurrentPark(currentPark) {
  return {type: SET_CURRENT_PARK, currentPark: currentPark}
}

module.exports = {
  setCampList,
  setCurrentPark,
  setParkList,
  setStateCode,
  setUserParks,
  setUserCamps,
  campsLoaded,
  parksLoaded,
  loginStatus
}