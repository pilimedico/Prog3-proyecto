import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../firebase/config'
import firebase from 'firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class FormComentarios extends Component {
    constructor(props){
        super(props)
        this.state = {
            texto: ""
            
        }
    }
    enviarComentario(texto){

        db.collection('posts').doc(this.props.postId)
        .update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                texto: texto
            })
        })
        .then((resp)=> this.setState({texto: ""}))
        .catch((err)=> console.log(err))
        
    }
  render() {
    return (
      <View>

        <TextInput
        placeholder='Agregue un comentario'
        keyboardType='default'
        onChangeText={(text)=> this.setState({texto:text})}
        value = {this.state.texto}
        multiline = {true}
        numberOfLines={4}
        style = {styles.input}
        
        />

        {this.state.texto !== '' ?

        

<TouchableOpacity onPress={() => this.enviarComentario(this.state.texto)}>
<MaterialCommunityIcons name="send" size={24} color="#AF47F7" style={styles.boton} />
</TouchableOpacity>
    
        
        :
        <>
        <Text>Escriba un comentario para poder enviar</Text>
        </>
        }

        
        
      </View>
    )
  }
}
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#AF47F7'
    },
    boton: {
        width: '10vw',
        height: 50
    }
})