import { StyleSheet } from 'react-native'
import { APP_COLORS } from '../../styles/color'

export const styles = StyleSheet.create({
    buttonChangeStatus: {backgroundColor: APP_COLORS.primaryAction, borderRadius: 10},
    buttonDelete: {backgroundColor: 'red', borderRadius: 10},
    modal: {backgroundColor: APP_COLORS.primaryText, height: 200, justifyContent: 'space-around'},
    buttonView: {flexDirection: 'row', justifyContent:'center'},
    textView: {alignItems: 'center', justifyContent:'center'}
})