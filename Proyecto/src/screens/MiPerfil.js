import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'


export default class MiPerfil extends Component {
  
  logout(){
    auth.signOut()
    this.props.navigation.navigate('Register')
  }

  render() {
    return (
      <View>
        
       <Text> Mi perfil </Text>


       <TouchableOpacity
          style={styles.signoutBtn}
          onPress={()=> this.logout()}
          >
            <Text>Cerrar sesión</Text>
          </TouchableOpacity>

       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  signoutBtn:{
    backgroundColor:'red',
    padding: 16
  }
})