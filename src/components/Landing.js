import React from "react"
import * as RN from "react-native"
 
const backgroundUrl = require("../../assets/background.jpg")

const Landing = (props) => {

    const homeSelector = async () => {
        let nonsense = await RN.AsyncStorage.multiGet(['token', 'userId'])
        let token = nonsense[0][1]
        if (token) {
            console.log("You are logged in, going to your homepage")
            props.navigation.navigate("UserHome")
        } else {
            console.log("You are not logged in, going to generic homepage")
            props.navigation.navigate("Home")
        }
      }

    return (
        <RN.SafeAreaView >
          <RN.ImageBackground 
              source = {backgroundUrl}
              style = {styles.backgroundImg} >
            <RN.Text style = {styles.title}>
              Pick A Park
            </RN.Text>
            <RN.Text 
              onPress={() => homeSelector()}
              style = {styles.enter}>
              Enter
            </RN.Text>
          </RN.ImageBackground>
        </RN.SafeAreaView>
    );
}
  
const styles = RN.StyleSheet.create({
  title: {
    fontSize: 50,
    backgroundColor: "rgba(200, 200, 200, 0.7)",
    width: RN.Dimensions.get("window").width,
    textAlign: "center",
    alignItems: "baseline"
    // justifyContent: "center"
  },
  enter: {
    fontSize: 50,
    marginTop: RN.Dimensions.get("window").height / 3,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "rgba(200, 200, 200, 0.3)",
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImg: {
    alignItems: "center",
    width: RN.Dimensions.get("window").width,
    height: RN.Dimensions.get("window").height,
  }
})

export default Landing