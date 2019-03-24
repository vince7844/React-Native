import React from 'react';
import Modal from 'react-native-modal';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './style';

const MenuTask = ({isVisible, onDisapearCallBack, onDeleteCallBack, onChangeStatusCallBack}) => (
    <TouchableWithoutFeedback onPress={() => onDisapearCallBack()}>
    <Modal
      isVisible={isVisible}
      animationIn={'zoomInDown'}
      animationOut={'zoomOutUp'}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransiitonInTiming={1000}
      backdropTransiitonOutTiming={1000}
    >
      <TouchableWithoutFeedback>
        <View style={styles.modal}>
          <View style={styles.textView}>
            <Text>Que souhaitez vous faire sur la tâche</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              buttonStyle={styles.buttonDelete}
              title="Supprimer"
              onPress={() => onDeleteCallBack()}
            />
            <Button
              buttonStyle={styles.buttonChangeStatus}
              title="Changer status"
              onPress={() => onChangeStatusCallBack()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
</TouchableWithoutFeedback>
);

export default MenuTask;