import React from "react"
import * as RN from "react-native"
import Config from '../Config'

const backgroundUrl = Config.BACKGROUND_URL

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
              source = {{uri: backgroundUrl}}
              style = {styles.backgroundImg} >

            <RN.Button 
                title={"Enter"}
                onPress={() => homeSelector()}/>
          </RN.ImageBackground>
        </RN.SafeAreaView>
    );
}
  
const styles = RN.StyleSheet.create({
    title: {
        marginTop: 20,
        fontSize: 50,
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImg: {
        justifyContent: "center",
        width: RN.Dimensions.get("window").width,
        height: RN.Dimensions.get("window").height
    }
})

export default Landing