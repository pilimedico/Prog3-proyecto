import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker'

export default class imagePicker extends Component {
    constructor(props){
        super(props)
        this.state = {
            imgCargada: ''
        }
    }
    
    activarPicker(){
//metodo que ultiliza imagePicker
ImagePicker.launchImageLibraryAsync() //como es una promesa escribimos then y catch
.then(image => this.setState({imgCargada:image.assets[0].uri})) //solo entra al then si el usuario selecciono una imagen (se realizo la accion del imagePicker)
.catch(err => console.log(err)) //ocurre un error seleccionando la foto o el usuario no trae nada
    }
  render() {
    return (
      <View>
        <TouchableOpacity
        onPress={()=> this.activarPicker()}
        style= {styles.btn}
        >
            <Text style = {styles.textBtn}> Cargue su imagen desde la libreria </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    
    letraPerfil: {
      fontSize:'large',
      margin: '16px'
    },
    btn:{
        backgroundColor:'#D8BFD8',
        padding:25
    },
    textBtn:{
        color:'white',
        alignSelf: 'center',
        fontSize: 'large'
    }
  })