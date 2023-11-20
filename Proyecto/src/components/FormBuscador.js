import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default class FormBuscador extends Component {
    constructor(props){
        super(props)
    }

    evitarSubmit(event) {
        event.preventDefault();
    
    }

    onChangeText(text){
        this.props.actualizarBusqueda(text);
        this.props.usuarioFiltrado(text);

    }

    render() {
        return (
          <View>
            <TextInput
            style={styles.input}
            placeholder="Realice su búsqueda por email"
            name="búsqueda"
            onChangeText={(text) => this.onChangeText(text)}
            />
            <TouchableOpacity 
            style={styles.btn}
            onPress={(event) => this.evitarSubmit(event)}>
             <Text style = {styles.textBtn} >Buscar</Text>
             
            </TouchableOpacity>
          </View>
        );
      }
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: '#DA70D6',
        margin: 20,
        height : '50px',
        width: '300px',
        alignSelf: 'center'
    },
    btn:{
        backgroundColor:'#D8BFD8',
        padding:25,
        margin: '16px'
    },
    textBtn:{
        color:'white',
        alignSelf: 'center',
        fontSize: 'large'
    },
    textLink:{
        marginBottom:24,
    
        fontSize:'50px',
        margin: '16px',
        textAlign: 'center',
        color: '#D87093'
    },
    container:{
        flex:1, 
        justifyContent: 'center',
        backgroundColor: '#FFF0F5'
      },
      textNoBoton: {
        color:'white',
        alignSelf: 'center',
        fontSize: 'large',
        backgroundColor:'#D8BFD8',
        padding:25
      }
    
})
