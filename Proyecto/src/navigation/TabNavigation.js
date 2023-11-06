import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons';

import Home from '../screens/Home'
import Buscador from '../screens/Buscador'
import Perfil from '../screens/Perfil'
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
            tabBarIcon: ()=> <FontAwesome5 name='home' size={24} color='green' />
        }}
        />
         <Tab.Screen 
        name='CrearPosteo' 
        component={CrearPosteo}
        options={{
            headerShown:false
        }}
        />
        <Tab.Screen 
        name='Buscador' 
        component={Buscador}
        options={{
            headerShown:false
        }}
        />
        <Tab.Screen 
        name='Perfil' 
        component={Perfil}
        options={{
            headerShown:false
        }} 
        />
    </Tab.Navigator>
  )
}