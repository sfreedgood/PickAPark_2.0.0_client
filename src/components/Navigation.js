import {createSwitchNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Landing from "./Landing"
import Home from "./Home"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import ParkDetail from "./content/ParkDetail"
import Campgrounds from "./content/Campgrounds"
import UserParks from './userContent/UserParks';
import UserCamps from './userContent/UserCamps';

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