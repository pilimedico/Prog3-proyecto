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
        <Text style = {styles.letraCamara}>Describe tu post</Text>
        <View>

            <TextInput
            placeholder='Agrega una descripcion de su post'
            onChangeText= {(text)=>this.props.actualizarDescripcion(text)}
            value = {this.props.estadoDescripcion}
            style = {styles.input}
            multiline = {true}
            numberOfLines={8}
            
            />

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#DA70D6'
    },
    btn:{
        borderWidth: 1,
        borderColor: 'green'
    },
    letraCamara: {
        fontSize:'50px',
        margin: '16px',
        textAlign: 'center',
        color: '#D87093'
    }


})