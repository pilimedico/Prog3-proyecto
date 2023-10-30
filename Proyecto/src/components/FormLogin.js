import { Text, View, TextInput, StyleSheet,TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

export default class FormLogin extends Component {
constructor(props){
    super(props)
    this.state = {
        mail: "",
        password: ""
    
    }
}

loguearUsuario(mail,password){
    auth.signInWithEmailAndPassword(mail,password)
    .then((user)=> console.log("Se logueo correctamente al usuario:" + user))
    .catch((err)=> console.log(err))
}

  render() {
    return (
      <View>
        <Text>Login</Text>
        <View>


            <TextInput
            //pidiendo el mail
            
                style = {styles.input}
                placeholder = "Dinos tu mail"
                keyboardType='email-address' 
                value= {this.state.mail}  
                onChangeText = {(text) => this.setState({mail:text})} 
            />

            <TextInput
            //pidiendo la contraseña
            
                style = {styles.input}
                placeholder = "Dinos tu contraseña"
                keyboardType='default' 
                value= {this.state.password}  
                secureTextEntry = {true}
                onChangeText = {(text) => this.setState({password:text})} 
            />

            <TouchableOpacity 
            onPress={()=> this.loguearUsuario(this.state.mail,this.state.password)}
            style = {styles.boton}>
                <Text style = {styles.textBoton}> Iniciar sesión</Text>
            </TouchableOpacity>




            


        </View>

      </View>
    )
  }

  
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "red",
        marginBottom: 24
    },
    boton: {
        backgroundColor: "black",
        padding: 16
    },
    textBoton: {
        color: "white"
    }
})