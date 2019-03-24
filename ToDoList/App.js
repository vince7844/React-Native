import React from 'react'
import Header from './components/header'
import TaskList from './components/task-list'
import { View, ScrollView, Text, AsyncStorage } from 'react-native'
import ButtonAddTask from './components/button-add-task'
import MenuTask from './components/menu-task'
import lodash from 'lodash'
import { TASK } from './model'
import TextPrompt from './components/text-prompt'
import { style } from './style.js'

const storageKey='taskList'

export default class App extends React.Component {
  state = {
    taskList: [],
    isMenuTaskVisible: false, 
    currentTask: {},
    isPromptTaskVisible: false,
    idGenerator: 0,
    isRenamePromptVisible: false
  }

  componentWillMount() {
    AsyncStorage.getItem(storageKey).then(storedTaskList => {
      if(storedTaskList) {
        this.setState({taskList: JSON.parse(storedTaskList)}, () => {
          this.setState({idGenerator: this.state.taskList[this.state.taskList.length-1].id+1})
        })
      }
    })
  }
  // ----------------- MODIFIER UNE TÂCHE --------------------

  toggleMenuTaskVisibility = (task) => {
    let currentTask = task
    if(this.state.isMenuTaskVisible) {
      currentTask = {}
    }

    this.setState({
      isMenuTaskVisible: !this.state.isMenuTaskVisible,
      currentTask: currentTask
    })
  }

  deleteCurrentTask = () => {
    const index = lodash.findIndex(this.state.taskList, {id: this.state.currentTask.id})
    const list = this.state.taskList
    list.splice(index, 1)
    this.setState({ taskList: list, currentTask: {} }, () => {
      this.toggleMenuTaskVisibility()
      this.saveTaskList()
    })
  }


  toggleTaskStatus = () => {
    // récupère la tâche cliqué
    const updatedTask = this.state.currentTask 
    // si le status de la tâche est 'en cours' alors mettre 'terminé' et inversement
    updatedTask.status = this.state.currentTask.status === TASK.doneStatus ? TASK.todoStatus : TASK.doneStatus
    // génère l'index de la tâche cliqué 
    const index = lodash.findIndex(this.state.taskList, {id: this.state.currentTask.id})
    // updatedTaskList contient toute la liste
    const updatedTaskList = this.state.taskList
    // updatedTaskList[index] (de la task cliqué) égale à la tâche cliqué 
    updatedTaskList[index] = updatedTask
    // mise à jour du state
    this.setState({taskList: updatedTaskList, isMenuTaskVisible: false, currentTask: {}}, () => {
      this.saveTaskList()
    })
  }

// ----------------- AJOUTER UNE TÂCHE --------------------

  onPressAddTask = () => {
    this.setState({isPromptTaskVisible: true})
  }

  hidePromptTask = () => {
    this.setState({isPromptTaskVisible: false})
  }

  toggleAddTask = (value) => {
    const task = {
      id: this.state.idGenerator,
      content: value,
      status: TASK.todoStatus
    }

    if(value == '') {
      this.setState({ isPromptTaskVisible: false })
    } else {
      this.setState({ isPromptTaskVisible: false, 
        taskList:[...this.state.taskList, task], 
        idGenerator: this.state.idGenerator + 1 }, () => this.saveTaskList())
      console.log(task)
    }
  }

  // ----------------- RENOMMER LE CONTENU D'UNE TÂCHE --------------------

  displayRenameTask = (task) => {
    this.setState({currentTask: task, isRenamePromptVisible: true})
  }

  hideRenamePrompt = () => {
    this.setState({isRenamePromptVisible: false, currentTask: {}}) 
  }

  renameTask = (value) => {
    const updatedTask = this.state.currentTask 
    updatedTask.content = value
    const index = lodash.findIndex(this.state.taskList, {id: this.state.currentTask.id})
    const updatedTaskList = this.state.taskList
    updatedTaskList[index] = updatedTask
    this.setState({taskList: updatedTaskList}, () => {
      this.hideRenamePrompt(),
      this.saveTaskList()
    })
  } 

  // ----------------- AFFICHAGE SANS TÂCHE --------------------

  renderTaskList = () => {
    if(this.state.taskList.length > 0) {
     return (
              <TaskList onPressCallBack={this.toggleMenuTaskVisibility} 
                        taskList={this.state.taskList}
                        onLongPressCallBack={this.displayRenameTask}/>
            )
    } else {
      return (
        <View style={style.noTask}>
          <Text>Cliquer sur le bouton ajouter pour créer une tâche</Text>
        </View> 
      )
    }
  }

  // -----------------SAUVEGARDE DE LA TÂCHE --------------------

  saveTaskList = () => {
    AsyncStorage.setItem(storageKey, JSON.stringify(this.state.taskList))
  }

  render() {
    return (
      <View style={{flex: 1}}> 
         <Header content="Liste des tâches"/>

         <ScrollView>
           {this.renderTaskList()}
         </ScrollView>

         <MenuTask isVisible={this.state.isMenuTaskVisible} 
                   onDisapearCallBack={this.toggleMenuTaskVisibility}
                   onDeleteCallBack={this.deleteCurrentTask}
                   onChangeStatusCallBack={this.toggleTaskStatus}/>

         <TextPrompt isVisible={this.state.isPromptTaskVisible} 
                     onCancelCallBack={this.hidePromptTask}
                     onSubmitCallBack={this.toggleAddTask}
                     title={"Ajouter une nouvelle tâche"}
                     placeHolder={"Ex: Acheter du lait"}
                     defaultValue={""} />

         <TextPrompt isVisible={this.state.isRenamePromptVisible}
                     onCancelCallBack={this.hideRenamePrompt} 
                     onSubmitCallBack={this.renameTask}
                     title={"Renommer la tâche"}
                     defaultValue={this.state.currentTask.content}  />
                    
         <ButtonAddTask addTask={this.onPressAddTask}/>
      </View>
    );
  }
}
 
