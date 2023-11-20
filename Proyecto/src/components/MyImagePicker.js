import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker'
import {storage} from '../firebase/config'

export default class MyImagePicker extends Component {
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

    rechazarImagen(){
      this.setState({imgCargada: ''})

    }

    aceptarImagen(){
      fetch(this.state.imgCargada)
      .then(resp => resp.blob()) //recibe la imagen, la parsea con blob y pasa a otro then
      //lega la imagen tal como necesitamos
      .then(image => {
        let ref = storage.ref(`imgPerfil/${Date.now()}.jpeg`) //le cargamos la ruta donde queremos que se guarde en el storage
        ref.put(image)
        .then(()=> {
          ref.getDownloadURL()
          .then(url => this.props.actualizarFotoPerfil(url))
        }) //una vez que se suba queremos usar el metodo de getDownloadURL y retorna una url que queremos pasarsela al padre (vista encargada de actualizar el documento del usuario)
      }) 
      .catch(err => console.log(err))

    }
  render() {
    return (
      <View>
        {this.state.imgCargada != '' ?
        <>
        <Image
        source = {{uri: this.state.imgCargada}}
        style = {styles.img}
        />
        <TouchableOpacity 
        onPress={()=> this.aceptarImagen()}
        style = {styles.btn}>
          <Text style = {styles.textBtn}>Aceptar imagen</Text> 
        </TouchableOpacity>
        
        <TouchableOpacity 
        onPress={()=> this.rechazarImagen()}
        style = {styles.btn}>
          <Text style = {styles.textBtn}>Rechazar imagen</Text>
        </TouchableOpacity>

        </>
//si es disitnto de vacio presento mi componente image para mostrar la imagen que cargo el usuario
//si la acepta cargar infromacion al firebase, si rechaza limpiar el estado

        :
        <>
            <TouchableOpacity
            onPress={()=> this.activarPicker()}
            style= {styles.btn}
            >
                <Text style = {styles.textBtn}> Cargue su imagen desde la libreria </Text>
            </TouchableOpacity>
        
        
        
        </>


        
        }
        
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
    },
    img: {
      height : 200
    }
  })