import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigation from './TabNavigation';

import Register from '../screens/Register';
import Login from '../screens/Login';
import Comentarios from '../screens/Comentarios';
import infoAdicionalUser from '../screens/infoAdicionalUser';

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
          name='infoAdicionalUser'
          component={infoAdicionalUser}
          options={{
          headerShown: true
           }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}