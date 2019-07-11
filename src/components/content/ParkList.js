import React from "react"
import * as RN from "react-native"
import Park from "./Park"

const ParkList = (props) => {
  // console.log(props)
    return(
        <RN.SafeAreaView style={{flex: 1}}>

            <RN.ScrollView>
                {props.parks && 
                    <Park parks={props.parks}
                        navigation={props.navigation} />
                }
            </RN.ScrollView>

        </RN.SafeAreaView>
    )
}

export default ParkList