import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default class FormDescripcionPost extends Component {
  constructor(props){
      super(props)
      this.state = {
          descripcion : ''
      }
  }
  
    render() {
    return (
      <View>
        <Text>Describe tu post</Text>
        <View>

            <TextInput
            placeholder='Agrega una descripcion de su post'
            onChangeText={(text) => this.setState({
                descripcion : text
            })}
            value = {this.state.descripcion}
            style = {styles.input}
            
            />

            <TouchableOpacity //este boton ejecuta un metodo que envia cosas a firebase, la screen se encarga de enviar la informacion
            style = {styles.btn} 
            onPress = {()=> this.props.onSubmit({
                descripcion : this.state.descripcion
            })} //metodo con el que ejecutamos el envio de informacion a firebase (desde la screen NewPost)
            >
                <Text>
                    Enviar
                </Text>

            </TouchableOpacity>

         


        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'red'
    },
    btn:{
        borderWidth: 1,
        borderColor: 'green'
    }


})