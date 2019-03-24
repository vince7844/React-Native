import React from 'react';
import { View } from 'react-native'
import Prompt from 'rn-prompt';

const TextPrompt = ({isVisible, onCancelCallBack, onSubmitCallBack, title, placeHolder, defaultValue}) => (
   <View>
        <Prompt
            title={title}
            placeholder={placeHolder}
            defaultValue={defaultValue}
            visible={ isVisible }
            onCancel={() => onCancelCallBack()}
            onSubmit={(value) => onSubmitCallBack(value)} />
    </View> 
)

export default TextPrompt
