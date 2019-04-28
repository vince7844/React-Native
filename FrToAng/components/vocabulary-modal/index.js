import React from 'react'
import Modal from 'react-native-modal'
import { TouchableOpacity, TouchableWithoutFeedback, View, Button } from 'react-native'
import { styles } from './style'
import { Text, Icon } from 'react-native-elements'

const VocabularyClickedModal = ({OnDisappear, isVisible, onStatusPress, onDeletePress}) => (
    <TouchableWithoutFeedback>
        <View>
            <Modal isVisible={isVisible}>
                <TouchableWithoutFeedback>
                    <View style={styles.modal}>
                      <View style={{ width: 40, alignSelf: 'flex-end', marginRight: 10, marginTop: 5 }}>  
                            <TouchableOpacity onPress={() => OnDisappear()}>
                                <Icon name='cancel'
                                    color='white'
                                    size={30} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.text}>
                            <Text style={{color: 'white', fontSize: 18, marginBottom: 20}}>Que souhaitez-vous faire ?</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <View style={styles.button}>
                                <Button title="Changer de status" 
                                        onPress={() => onStatusPress()} />
                                <Button title="Supprimer"
                                        onPress={() => onDeletePress()} />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    </TouchableWithoutFeedback>
)

export default VocabularyClickedModal