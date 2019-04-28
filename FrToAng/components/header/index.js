import React from 'react'
import { Text, View } from 'react-native'
import { material } from 'react-native-typography'
import { styles } from './style'

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={[material.headline, {color: styles.text.color}]}>Your English Vocabulary</Text>
        </View>
    );
};


export default Header;