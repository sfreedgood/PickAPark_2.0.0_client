import React from "react"
import * as RN from "react-native"

const Park = (props) => {
    const parkList = props.parks.map((el, key) => {
        return (
            <RN.View 
                    style={styles.parkContainer}
                    id={el.parkCode}
                    key={key} >
                <RN.Text style={styles.parkName}>
                    {el.name}
                </RN.Text>
                <RN.Text style={styles.parkDescription}>
                    {el.description}
                </RN.Text>
                <RN.Button 
                    title="More Info"
                    onPress={() => {
                        props.navigation.navigate('ParkDetail', {
                            parkCode: el.parkCode
                        })
                    }}
                />

            </RN.View>
        )
    })

    return (
        <RN.View>
            {parkList}
        </RN.View>
    )
}

const styles = RN.StyleSheet.create({
    parkContainer: {
        padding: 2,
    },
    parkName: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "600",
    },
    parkDescription: {

    }
})

export default Park