import { StyleSheet } from 'react-native'
import { APP_COLORS } from '../../styles/color'

export const styles = StyleSheet.create({
    modal: {
        backgroundColor: "#011f4b",
        height: 300,
        justifyContent: 'space-around'
    },
    button: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        alignItems: 'center',   
        marginTop: 20,
        color: "white",
        textAlign: 'left'
    },
    box1: {
        marginBottom: 15 
    },
    box2: {
        marginTop: 1
    }
})