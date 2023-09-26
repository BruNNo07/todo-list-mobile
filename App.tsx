import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Counters } from './src/components/counters';
import { View,Image, TextInput, TouchableOpacity,Text,FlatList } from "react-native";
import { TaskConteiner } from './src/components/taskConteiner';

export interface Task {
  name: string
  status: 'finished' | 'in progress'
}

export default function App() {
  const [tasks,setTasks] = useState<Task[]>([])
  const [taskText,setTaskText] = useState<string>('')

  function handleAddTask(){
    setTasks(state => [...state,{name: taskText,  status: 'in progress'}])
    setTaskText('')
  }

  function handleFinishedTask (name:string){
    const indexTaskToUpdate = tasks.findIndex(task => task.name === name)
    const tempTask = [...tasks]
    
    if(tempTask[indexTaskToUpdate].status === 'in progress'){
      tempTask[indexTaskToUpdate].status = 'finished'
    } else {
      tempTask[indexTaskToUpdate].status = 'in progress'
    }

    setTasks(tempTask)
  }

  function handleDeleteTask (name:string){
    const tasksWithoutDelete = tasks.filter(task => task.name !==name)
    setTasks(tasksWithoutDelete)
  }
  
  return (
    <View className='flex-1 bg-gray-600'>
      <View className='bg-gray-700 items-center justify-center h-44'>
        <Image source={require('./assets/Logo.png')} />
      </View>

      <View className='flex-row m-4 mt-[-30]'>
        <TextInput 
          className='p-3 bg-gray-500 border border-gray-700 flex-1 rounded mr-2 text-gray-100'
          onChangeText={setTaskText}
          placeholder='Adicione uma nova tarefa' placeholderTextColor={'#808080'}
          value={taskText}
        />
        <TouchableOpacity className='bg-blue-dark rounded justify-center items-center w-12' onPress={handleAddTask}>
          <Text className='color-gray-100'>+</Text>
        </TouchableOpacity>
      </View>

      <Counters data={tasks}/>

      <View className='border-t border-gray-400 mt-6 pt-6'>
        <FlatList 
        keyExtractor={item => item.name}
        data={tasks} 
        renderItem={({item}) => (
          <TaskConteiner key={item.name} name={item.name} status={item.status} onFinished={() => handleFinishedTask(item.name)} onDelete={handleDeleteTask}/>
        )} 
        ListEmptyComponent={() => (
          <View className='items-center gap-2 mt-8'>
            <Image source={require('./assets/Clipboard.png')}/>
            <Text className='text-gray-300 font-bold'>Você Não tem Tarefas Cadastradas</Text>
            <Text className='text-gray-300'>Crie tarefas e organize seus itens a fazer</Text>
          </View>
        )}>

        </FlatList>
      </View>
      <StatusBar translucent/>
    </View>
  );
}
