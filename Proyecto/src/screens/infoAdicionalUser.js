//actualizar documento del usuario

import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import imagePicker from '../components/imagePicker'

export default class infoAdicionalUser extends Component {
  constructor(props){
    super(props)
    this.state = {
      fotoPerfil: ''
    }
  }

  actualizarEstadoFotoDePerfil(url){
    this.setState({fotoPerfil: url})
  }

  actualizarDocDelUsuario(){
    console.log(this.props.route.params.docId)
    db.collection('users')
    .doc(this.props.route.params.docId)
    .update({
      fotoPerfil: this.state.fotoPerfil
    })
    .then(resp => {
      this.props.navigation.navigate('TabNavigation')
    })
  }
  render() {
    return (
      <View style = {styles.container} >
        <Text style = {tituloinfo}>Cargue su imagen de perfil</Text>
        <imagePicker 
        actualizarFotoPerfil = {(url)=> this.actualizarEstadoFotoDePerfil(url)} 
        />
        {
          this.state.fotoPerfil !== '' ?
          <TouchableOpacity
          onPress={()=> this.actualizarDocDelUsuario()}
          
          >
          <Text>Añadir foto de perfil</Text>
        </TouchableOpacity>
        : null
        }
        <TouchableOpacity>
          <Text>Omitir paso</Text>
        </TouchableOpacity>
        
        
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