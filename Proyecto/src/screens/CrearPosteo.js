import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
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
          comentarios:[],
          descripcion: descripcion //lo que recibimos por parametro
      })
      //es una promesa asi que usamos then y catch, si se guarda todo correctamente volver a home
      .then((res)=> this.props.navigation.navigate('Home')) 
      .catch((err)=> console.log(err))

  }
actualizarDescripcion(text){
  this.setState({
    descripcion:text
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
        <Text style = {styles.titulocrear} >Cargar post</Text>
        {
          this.state.paso1 ?
            <CamaraPost
              actualizarFotourl= {(url)=> this.actualizarFotourl(url)}
            />
          :
          <>
            <FormDescripcionPost
            
            actualizarDescripcion={(descripcion)=> this.actualizarDescripcion(descripcion)}
            estadoDescripcion = {this.state.descripcion}
            />
            <TouchableOpacity
              onPress={()=> this.onSubmit({
                  descripcion: this.state.descripcion,
                  fotoUrl: this.state.urlFoto
              })}
            >
                <Text style= {styles.letraCrear}>
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
    flex:1, 
    
    backgroundColor: '#FFF0F5'
  },
  titulocrear : {
    color: '#FF69B4',
    fontSize: '80px',
    marginBottom: '15px'

  },
  letraCrear: {
    fontSize:'50px',
    margin: '16px',
    textAlign: 'center',
    color: '#D87093'
}
})