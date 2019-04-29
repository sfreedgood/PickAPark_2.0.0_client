// Action Creators
function loginStatus(bool) {
  return {type: LOGIN_STATUS, bool}
}

function setState(stateCode) {
  return {type: SET_STATE, stateCode}
}

function setParkList(parkList) {
  return {type: SET_PARK_LIST, parkList}
}

function setCampList(campList) {
  return {type: SET_CAMP_LIST, campList}
}

function campsLoaded(bool) {
  return {type: CAMPS_LOADED, bool}
}

function parksLoaded(bool) {
  return {type: PARKS_LOADED, bool}
}

function setUserCamps(userCampList) {
  return {type: SET_USER_CAMPS, userCampList}
}

function setUserParks(userParkList) {
  return {type: SET_USER_PARKS, userParkList}
}

function setCurrentPark(currentPark) {
  return {type: SET_CURRENT_PARK, currentPark}
}

module.exports = {
  setCampList,
  setCurrentPark,
  setParkList,
  setState,
  setUserParks,
  setUserCamps,
  campsLoaded,
  parksLoaded,
  loginStatus
}