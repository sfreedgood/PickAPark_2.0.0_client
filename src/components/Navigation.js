import {createSwitchNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Landing from "./components/Landing"
import Home from "./components/Home"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import ParkDetail from "./components/content/ParkDetail"
import Campgrounds from "./components/content/Campgrounds"
import UserParks from './components/userContent/UserParks';
import UserCamps from './components/userContent/UserCamps';

const MainNavigator = createSwitchNavigator({
  Landing: Landing,
  Home: {
    screen: createBottomTabNavigator({
      "Home": Home,
      "Login": Login,
      "SignUp": Signup
    })
  },
  ParkDetail: ParkDetail,
  Campgrounds: Campgrounds,
  UserHome: {
    screen: createBottomTabNavigator({
      "Home": Home,
      "My Parks": UserParks,
      "My Camps": UserCamps
    })
  }
},
  {
    initialRouteName: "Landing"
  }
);

const CustomNavigation = createAppContainer(MainNavigator);

export default CustomNavigation;