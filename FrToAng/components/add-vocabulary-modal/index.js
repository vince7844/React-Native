import React from 'react'
import Modal from 'react-native-modal'
import { View, Text, TextInput, Button } from 'react-native'
// import { Input } from 'react-native-elements';
import { styles } from './style' 
import TranslatedWord from './translatedWord'

const AddVocabularyModal = ({isVisible, onCancelClick, onAjouterClick}) => (
    <View>
        <Modal isVisible={isVisible}>
          <View style={styles.modal}>
            <TranslatedWord onCancelClick={onCancelClick} onAjouterClick={onAjouterClick}/>
          </View>
        </Modal>
    </View>
)

export default AddVocabularyModal