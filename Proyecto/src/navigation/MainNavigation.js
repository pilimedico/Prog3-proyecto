import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigation from './TabNavigation';

import Register from '../screens/Register';
import Login from '../screens/Login';
import Comentarios from '../screens/Comentarios';
import InfoAdicionalUser from '../screens/InfoAdicionalUser';
import PerfilAmigo from '../screens/PerfilAmigo';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen 
          name='Register' 
          component={Register}
          options={{
            headerShown: false
          }}
          />
        <Stack.Screen 
        name='Login' 
        component={Login}
        options={{
          headerShown: false
        }}
        />
        <Stack.Screen 
        name='TabNavigation' 
        component={TabNavigation}
        options={{
            headerShown:false
        }}
        />
        <Stack.Screen
          name='Comentarios'
          component={Comentarios}
          options={{
          headerShown: true
           }}
        />
        <Stack.Screen
          name='InfoAdicionalUser'
          component={InfoAdicionalUser}
          options={{
          headerShown: false
           }}
        />
        <Stack.Screen 
          name='PerfilAmigo' 
          component={PerfilAmigo}
          
          />
      </Stack.Navigator>
    </NavigationContainer>
  )
}