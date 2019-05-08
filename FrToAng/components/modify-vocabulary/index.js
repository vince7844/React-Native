import React from 'react'
import { View, Button, TextInput, Text } from 'react-native'
import Modal from 'react-native-modal'
import { styles } from './style'

const ModifyVocabularyModal = ({ModifyVocabularyModalIsVisible, defaultValueEnglishWord, defaultValueFrenchWord, onSubmitCallBackFrenchValue, onSubmitCallBackEnglishValue, onCancelPress, onModifyPress}) => (
    <View>
        <Modal isVisible={ModifyVocabularyModalIsVisible}>
            <View style={styles.modal}>
               <View style={{ marginTop: 20, marginBottom: 10 }}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Modify your english word</Text>
                    <View style={styles.input}>
                        <TextInput defaultValue={defaultValueEnglishWord} 
                                   style={{textAlign: 'center'}}
                                   onChangeText={(value) => onSubmitCallBackEnglishValue(value)} />
                    </View>
               </View>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Modify your french word</Text>
                 <View style={styles.input}>
                        <TextInput defaultValue={defaultValueFrenchWord} 
                                   style={{textAlign: 'center'}}
                                   onChangeText={(value) => onSubmitCallBackFrenchValue(value)} />
                </View>
                <View style={styles.button}>
                    <Button type="submit"
                            title='Modifier' 
                            onPress={onModifyPress}/>
                </View>
            </View>
        </Modal>
    </View>
)

export default ModifyVocabularyModal