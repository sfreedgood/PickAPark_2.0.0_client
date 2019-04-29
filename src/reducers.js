import * as AC from "./actionCreators" // AC abbr for ActionCreator
import * as AT from "./actionTypes" // AT abbr for ActionType

const initialState = {
  [AC.loginStatus]: false,
}

function pickAPark(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  switch(action.type) {
    case AT.LOGIN_STATUS:
      return {...state, : action.}
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  return state
}