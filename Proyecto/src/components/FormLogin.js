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
    //hacer toda la validacion, si da okey hacer el navigate a home.

    auth.signInWithEmailAndPassword(mail,password)
    .then((user)=> {
        this.props.navigation.navigate('TabNavigation')
    })
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

            <Text style={styles.textLink} >
                    ¿No tienes una cuenta?

                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate('Register')}
                    >
                        Regístrate aquí!
                    </TouchableOpacity>
                </Text>

            <TouchableOpacity 
            onPress={()=> this.loguearUsuario(this.state.mail,this.state.password)} //metodo de validacion, si no puede loguear le diga sino this.props.navigate. 
            style = {styles.btn}>
                <Text style = {styles.textBtn}> Iniciar sesión</Text>
            </TouchableOpacity>




            


        </View>

      </View>
    )
  }

  
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: 'green',
        marginBottom: 24
    },
    btn:{
        backgroundColor:'purple',
        padding:16
    },
    textBtn:{
        color:'white'
    },
    textLink:{
        marginBottom:24
    }
})