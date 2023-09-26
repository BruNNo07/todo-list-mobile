import React from "react";
import { View,Image,Text,TouchableOpacity } from "react-native";
import { Task } from "../../App";

interface TaskConteinerProps extends Task{
  onFinished: (name:string) => void
  onDelete: (name:string) => void
}

export function TaskConteiner({name, status, onFinished, onDelete}:TaskConteinerProps){
  return(
    <View className="flex-row p-2 bg-gray-500 justify-center items-center mx-4 mb-2 rounded border border-gray-400">
      {
        status === 'in progress' ? (
          <TouchableOpacity onPress={() => onFinished(name)}>
            <Image source={require('../../assets/uncheck.png')} />
          </TouchableOpacity>
        ): (
          <TouchableOpacity onPress={() => onFinished(name)}>
            <Image source={require('../../assets/check.png')} />
          </TouchableOpacity>
        )
      }
         {
        status === 'in progress' ? (
          <Text className="text-gray-100 flex-1 text-center">{name}</Text>
        ): (
          <Text className="text-gray-300 line-through flex-1 text-center">{name}</Text>
        )
      }
      
      <TouchableOpacity onPress={() => onDelete(name)}>
        <Image source={require('../../assets/trash.png')} />
      </TouchableOpacity>
    </View>
  )
}