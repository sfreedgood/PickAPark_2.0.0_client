import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from './src/store'
import CustomNavigator from './src/components/Navigation'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CustomNavigator />
      </Provider>
    )
  }
}