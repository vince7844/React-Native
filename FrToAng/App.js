import React from 'react';
import { View, ScrollView, Text, AsyncStorage} from 'react-native';
import VocabularyList from './components/vocabulary-list';
import Header from './components/header'
import VocabularyClickedModal from './components/vocabulary-modal';
import lodash from 'lodash'
import { styles } from './style'
import { state } from './status/status'
import AddVocabularyButton from './components/add-vocabularyButton'
import AddVocabularyModal from './components/add-vocabulary-modal'
import ModifyVocabularyModal from './components/modify-vocabulary'

const storageKey = 'vocabulary'

export default class App extends React.Component {
  state = {
    list: [],
    isVisible: false,
    isVisibleAddButton: false,
    modifyModalIsVisible: false,
    isRenameModalVisible: false,
    currentWord: {},
    idGenerator: 0,
    englishWord: '',
    frenchWord: ''
  }

  componentWillMount() {
    AsyncStorage.getItem(storageKey).then(storedVocabulary => {
      if(storedVocabulary) {
        this.setState({list: JSON.parse(storedVocabulary)}, () => {
          this.setState({idGenerator: this.state.list[this.state.list.length-1].id+1})
        })
      }
    })
  }

  renderOnPressModal = () => {
      if(this.state.list.length > 0) {
         return ( <VocabularyList list={this.state.list} 
                                  handlePressList={this.wordPressed}
                                  handleLongPressList={this.wordLongPressed} /> ) 
      } else {
        return (
          <View style={styles.text}>
             <Text>Click add button to add a new word</Text>
          </View>
          )
      }
  }

  changeStateWord = (eng, fra) => {
    this.setState({englishWord: eng, frenchWord: fra})
  }

  wordPressed = (word) => {
    let currentWord = word
    if(this.state.isVisible) {
      currentWord = {}
    }

    this.setState({ isVisible: !this.state.isVisible, currentWord: currentWord })
  }

  wordLongPressed = (word) => {
    this.setState({ isRenameModalVisible: true, currentWord: word })
  }

  /* ---- MODAL PRESSED ONCE ---- */

  onStatusPress = () => {
    const currentWord = this.state.currentWord
    if (currentWord.status === state.toLearn) {
      currentWord.status = state.learned
    } else if (currentWord.status === state.learned)  {
      currentWord.status = state.toLearn
    }
    this.setState({ isVisible: false, currentWord: currentWord}, () => {
      this.saveVocabulary()
    })
  }

  onDeletePress = () => {
    const index = lodash.findIndex(this.state.list, {id: this.state.currentWord.id})
    const updateList = this.state.list
    updateList.splice(index, 1)
    this.setState({ isVisible: false, list: updateList }, () => {
      this.saveVocabulary()
    })
  }

  OnDisappear = () => {
    this.setState({ isVisible: false })
  }

  /* ----- ON ADD WORD BUTTON CLICK ----- */

  addWord = () => {
    this.setState({isVisibleAddButton: true})
  }

 /* ---- ADD WORD MODAL ---- */

  onCancelClick = () => {
    this.setState({ isVisibleAddButton: false })
  }

  onAjouterClick = (eng, fra) => {
    const wordList = this.state.list
    const lastItem = lodash.lastIndexOf(wordList, wordList.id)

    const newWord = {
      id: lastItem+1,
      englishWord: eng,
      frenchWord: fra,
      status: state.toLearn
    }

    wordList.splice(wordList.length + 1, 0, newWord)
    this.setState({ isVisibleAddButton: false, list: wordList }, () => {
      this.saveVocabulary()
    })
  }

    /* ---- MODAL LONG PRESS ---- */

    onModifyPressModifyModal = () => {
      this.setState({ isRenameModalVisible: false })
    }

    onSubmitCallBackEnglishValue = (value) => {
      const newCurrentWord = this.state.currentWord
      newCurrentWord.englishWord = value
      this.setState({ currentWord: newCurrentWord }, () => {
        this.saveVocabulary()
      })
    }

    onSubmitCallBackFrenchValue = (value) => {
      const newCurrentWord = this.state.currentWord
      newCurrentWord.frenchWord = value
      this.setState({ currentWord: newCurrentWord }, () => {
        this.saveVocabulary()
      })
    }

    /* ---- SAUVEGARDE DU MOT DE VOCABULAIRE ---- */

    saveVocabulary = () => {
      AsyncStorage.setItem(storageKey, JSON.stringify(this.state.list))
    }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header />
        <ScrollView>
          {this.renderOnPressModal()}
        </ScrollView>
        
        <VocabularyClickedModal isVisible={this.state.isVisible}
                                onStatusPress={this.onStatusPress}
                                onDeletePress={this.onDeletePress} 
                                OnDisappear={this.OnDisappear} />
        
        <AddVocabularyModal isVisible={this.state.isVisibleAddButton} 
                            photo={this.state.photo}
                            onCancelClick={this.onCancelClick}
                            englishWord={this.state.englishWord}
                            frenchWord={this.state.frenchWord}
                            changeStateWord={this.changeStateWord}
                            onAjouterClick={this.onAjouterClick} /> 

        <AddVocabularyButton addWord={this.addWord}/>

        <ModifyVocabularyModal 
                    ModifyVocabularyModalIsVisible={this.state.isRenameModalVisible}
                    onCancelPress={this.onCancelPressModifyModal}
                    onModifyPress={this.onModifyPressModifyModal}
                    defaultValueFrenchWord={this.state.currentWord.frenchWord}
                    defaultValueEnglishWord={this.state.currentWord.englishWord}
                    onSubmitCallBackEnglishValue={this.onSubmitCallBackEnglishValue}
                    onSubmitCallBackFrenchValue={this.onSubmitCallBackFrenchValue} />
      </View>
    );
  }
}
