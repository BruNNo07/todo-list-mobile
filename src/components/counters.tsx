import React from "react";
import { View,Text } from "react-native";
import { Task } from "../../App";

interface CountersProps{
  data: Task[]
}

export function Counters ({ data }:CountersProps){
  const tasksFinisheds = data.filter(task => task.status ==='finished').length

  return(
    <View className="flex-row justify-between mx-4 mt-4">
      <View className="flex-row gap-2">
        <Text className="text-blue font-semibold text">Criadas</Text>
        <Text className="bg-gray-400 px-2 text-gray-100 rounded-full">{data.length}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-purple font-semibold text">Concluídas</Text>
        <Text className="bg-gray-400 px-2 text-gray-100 rounded-full">{tasksFinisheds}</Text>
      </View>
    </View>
  )
}