import { StyleSheet } from 'react-native'
import { APP_COLORS } from '../../styles/color'

export const styles = StyleSheet.create({
    header: {
        backgroundColor: APP_COLORS.headerBackgroundColor,
        padding: 30,
        alignItems: 'center',
        shadowColor: APP_COLORS.headerShadowColor,
        shadowOffset: { height: 20},
        elevation: 10
    }, 
    text: {
        color: APP_COLORS.headerTextColor
    }
})
