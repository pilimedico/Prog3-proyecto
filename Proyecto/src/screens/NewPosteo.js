/* import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db,auth} from '../firebase/config'
import FormDescripcionPost from '../components/FormDescripcionPost'
import CamaraPost from '../components/CamaraPost'

export default class NewPosteo extends Component {
  //como parametro le pasamos un objeto literal y le pasamos una recibe una descripcion
  constructor(props){
    super(props)
    this.state = {
      descripcion:'',
      urlFoto:'',
      paso1:true
    }
  }
  onSubmit({
      descripcion, //pasamos como parametro un objeto literal (tecnica de programacion)
      fotoUrl
  }){
      db.collection('posts').add({
          owner: auth.currentUser.email, //queremos que el posteo se firme con el usuario logueado
          createdAt: Date.now(),
          fotoUrl: fotoUrl,
          likes:[],
          comments:[],
          descripcion: descripcion //lo que recibimos por parametro
      })
      //es una promesa asi que usamos then y catch
      .then(()=> this.props.navigation.navigate('Home'))
      .catch((e) => console.log(e))

  }
  actualizarDescripcion(text){
    this.setState({
      descripcion: text
    })
  }

  actualizarFotourl(url){
    this.setState({
      urlFoto: url,
      paso1: false
    })
  }
  
    render() {
    return (
      <View style={styles.container}>
        <Text>NewPost</Text>
        {
          this.state.paso1 ?
            <CamaraPost
              actualizarFotourl= {(url)=> this.actualizarFotourl(url)}
            />
          :
          <>
            <FormDescripcionPost
            // onSubmit={(obj)=> this.onSubmit(obj)}
            actualizarDescripcion={(descripcion)=> this.actualizarDescripcion(descripcion)}
            estadoDescripcion = {this.state.descripcion}
            />
            <TouchableOpacity
              onPress={()=> this.onSubmit({
                  descripcion: this.state.descripcion,
                  fotoUrl: this.state.urlFoto
              })}
            >
                <Text>
                    Enviar
                </Text>
            </TouchableOpacity>
          </>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
}) */