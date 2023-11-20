import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 


import Home from '../screens/Home'
import Buscador from '../screens/Buscador'
import MiPerfil from '../screens/MiPerfil'
import CrearPosteo from '../screens/CrearPosteo'



const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator >
        <Tab.Screen 
        name='Home' 
        component={Home}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <FontAwesome5 name='home' size={24} color='black' />
        }}
        />
         <Tab.Screen 
        name='CrearPosteo' 
        component={CrearPosteo}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <MaterialIcons name="post-add" size={24} color="black" />,
            toBarLabel : 'Home'
        }}
        />
        <Tab.Screen 
        name='Buscador' 
        component={Buscador}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <Feather name="search" size={24} color="black" />
        }}
        />
        <Tab.Screen 
        name='MiPerfil' 
        component={MiPerfil}
        options={{
            headerShown:false,
             tabBarIcon: ()=> <Ionicons name="person" size={24} color="black" />
        }} 
        />
    </Tab.Navigator>
  )
}