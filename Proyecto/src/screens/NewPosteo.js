import { Text, View } from 'react-native'
import React, { Component } from 'react'
import {db,auth} from '../firebase/config'
import FormDescripcionPost from '../components/FormDescripcionPost'

export default class NewPosteo extends Component {
  //como parametro le pasamos un objeto literal y le pasamos una recibe una descripcion
    
  onSubmit({
      descripcion //pasamos como parametro un objeto literal (tecnica de programacion)
  }){
      db.collection('posts').add({
          owner: auth.currentUser.email, //queremos que el posteo se firme con el usuario logueado
          createdAt: Date.now(),
          descripcion: descripcion //lo que recibimos por parametro
      })
      //es una promesa asi que usamos then y catch
      .then((res)=> console.log(res)) 
      .catch((err)=> console.log(err))

  }
  
  
    render() {
    return (
      <View>
        <Text>Cargue su posteo: </Text>

        <FormDescripcionPost
        onSubmit = { (obj) => this.onSubmit(obj)} //lo que llegara con las props es un objeto
        
        />



      </View>
    )
  }
}