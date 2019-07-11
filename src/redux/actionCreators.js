// Action Creators
function loginStatus(bool) {
  return {
    type: "LOGIN_STATUS",
    payload: {
      bool: bool
    }
  }
}

function setStateCode(stateCode) {
  return {
    type: "SET_STATE_CODE",
    payload: {
      stateCode: stateCode
    }
  }
}

function setParkList(parkList) {
  console.log("action dispatched")
  return {
    type: "SET_PARK_LIST",
    payload: {
      parkList: parkList
    }
  }
}

function setCampList(campList) {
  return {
    type: "SET_CAMP_LIST",
    payload: {
      campList: campList
    }
  }
}

function campsLoaded(bool) {
  return {
    type: "CAMPS_LOADED",
    payload: {
      bool: bool
    }
  }
}

function parksLoaded(bool) {
  return {
    type: "PARKS_LOADED",
    payload: {
      bool: bool
    }
  }
}

function setUserCamps(userCampList) {
  return {
    type: "SET_USER_CAMPS",
    payload: {
      userCampList: userCampList
    }
  }
}

function setUserParks(userParkList) {
  return {
    type: "SET_USER_PARKS",
    payload: {
      userParkList: userParkList
    }
  }
}

function setCurrentPark(currentPark) {
  return {
    type: "SET_CURRENT_PARK",
    payload: {
      currentPark: currentPark
    }
  }
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