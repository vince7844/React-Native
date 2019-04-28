import React from 'react'
import ActionButton from 'react-native-action-button'
import { Icon } from 'react-native-elements'
import { APP_COLORS } from '../../styles/color'

const AddVocabularyButton = ({ addWord }) => (
    <ActionButton buttonColor={APP_COLORS.headerBackgroundColor}
                  onPress={() => addWord()}  >
        <Icon name='add'/>
    </ActionButton>
)

export default AddVocabularyButton