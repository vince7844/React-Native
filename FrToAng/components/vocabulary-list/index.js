import React from 'react';
import { View } from 'react-native';
import { ListItem, Badge } from 'react-native-elements'
import { styles } from './style'
import { state } from '../../status/status'
import { APP_COLORS } from '../../styles/color'

const VocabularyList = ({list, handlePressList, handleLongPressList}) => (
    <View>
        {
        list.map((l, i) => (
            <ListItem
                containerStyle={styles.list}
                key={i}
                title={l.englishWord}
                subtitle={l.frenchWord}
                onPress={() => handlePressList(l)}
                onLongPress={() => handleLongPressList(l)}
                badge={{ 
                    value: l.status, 
                    textStyle: {color: "white"},
                    badgeStyle: 
                        l.status === state.toLearn 
                        ? {backgroundColor: APP_COLORS.backgroundToLearnColor} 
                        : {backgroundColor: APP_COLORS.backgroundLearnedColor},
                }}
            />
        ))
    }
    </View>
)

export default VocabularyList