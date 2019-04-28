import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { styles } from './style' 

export default class TranslatedWord extends Component {
    state = {
        englishWord: '',
        frenchWord: ''
    }

    render() {
        return (
          <View>  
            <View style={styles.text}>
                <View style={styles.box1}>
                    <Text style={{fontSize: 18, color: "white", paddingBottom: 10}}>Add your English word</Text>
                    <TextInput placeholder='Your english word' 
                            onChangeText={(eng) => this.setState({englishWord: eng})} 
                            style={{fontSize: 18, backgroundColor: "white", width: 300, padding: 3}} />
                </View>
            </View>
            <View style={styles.text}>
                <View style={styles.box2}>
                    <Text style={{fontSize: 18, color: "white", paddingBottom: 10}}>Add your French word</Text>
                    <TextInput placeholder='Your french word' 
                            onChangeText={(fra) => this.setState({frenchWord: fra})} 
                            style={{fontSize: 18, backgroundColor: "white", width: 300, padding: 3}} />
                </View>
            </View>
            <View style={styles.button}>
                <Button title="Cancel"
                        onPress={() => this.props.onCancelClick()} />
                <Button title="Ajouter" 
                        onPress={() => this.props.onAjouterClick(this.state.englishWord, this.state.frenchWord)} />
            </View>
         </View>
        )
    }
}