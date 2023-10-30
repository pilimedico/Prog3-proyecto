import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

class FormRegister extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: "",
            mail: "",
            password: ""

        }
    }

    //usamos auth dentro del metodo registrarUsuario que recibe como parametro el name,email y password para registrar al usuario en nuestra firebase
    registrarUsuario(name,mail,password){
        auth.createUserWithEmailAndPassword(mail,password)
        .then(user => console.log(user))
        .catch(err => console.log(err))
        //como todos los metodos de firebase son promesas le agregamos then y catch
    }
  render() {
    return (
      <View>
        <Text>Registrese a la app</Text>

        <View>


            <TextInput
            //pidiendo el nombre

                style = {styles.input}
                placeholder = "Dinos tu nombre"
                keyboardType='default' //para que el usuario escriba lo que quiera
                value= {this.state.name} //lo conectamos ocn nuestro estado 
                onChangeText = {(text) => this.setState({name:text})} 

                //le pasamos el callback a ultilziar. Primero obtenemos lo que obtiene el usuario por parametro text
                //cada cambio que genere el usuario lo guardara en ese parametro text y lo tenemos listo para usar
                //actualizamos el valor del state por el valor que ingresa el usuario en el formulario
            
            />

            <TextInput
            //pidiendo el mail
            
                style = {styles.input}
                placeholder = "Dinos tu mail"
                keyboardType='email-address' //para que el usuario ingrese con el mail
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
            onPress={()=> this.registrarUsuario(this.state.name, this.state.mail,this.state.password)}
            style = {styles.boton}>
                <Text style = {styles.textBoton}> Registrarse</Text>
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
export default FormRegister