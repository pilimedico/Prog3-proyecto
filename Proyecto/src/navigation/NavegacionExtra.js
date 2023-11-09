import { Text, View } from 'react-native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home'
import PerfilAmigo from '../screens/PerfilAmigo';

const Stack = createNativeStackNavigator();

export default function NavegacionExtra() {
    return (
      
        <Stack.Navigator>

        <Stack.Screen 
          name='Home' 
          component={Home}
          options={{
            headerShown: false
          }}
          />
          <Stack.Screen 
          name='PerfilAmigo' 
          component={PerfilAmigo}
          options={{
            headerShown: false
          }}
          />


            

          
        </Stack.Navigator>
      
    )
  }