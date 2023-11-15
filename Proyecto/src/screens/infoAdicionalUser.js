//actualizar documento del usuario

import { Text, View } from 'react-native'
import React, { Component } from 'react'
import imagePicker from '../components/imagePicker'

export default class infoAdicionalUser extends Component {
  render() {
    return (
      <View style = {styles.container} >
        <Text style = {tituloinfo}>Cargue su imagen de perfil</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#FFF0F5'
    },
    tituloinfo : {
        color: '#FF69B4',
        fontSize: '80px'
    
      }
  })