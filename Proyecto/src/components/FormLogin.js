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
    .catch((err)=> alert('Usuario o contraseña incorrecto'))
}



  render() {
    return (
      <View style = {styles.container}>
          <Text style={styles.tituloRegister} > Login </Text>
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
                    ¿No tienes una cuenta?   </Text>

                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate('Register')}
                        style={styles.textLink}
                    >
                       <Text  style = {styles.textRegistrate} > Regístrate aquí!</Text>
                        
                    </TouchableOpacity>
              

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
        borderColor: '#DA70D6',
        marginBottom: 24,
        height : '50px',
        width: '80%',
        alignSelf: 'center'
    },
    btn:{
        backgroundColor:'#D8BFD8',
        padding:25
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
      textRegistrate: {
        fontSize: "40px",
        margin: 20,
        textAlign: "center",
        color: "#C994DC"
    
      },
      tituloRegister : {
        color: '#FF69B4',
        fontSize: '40px',
        marginBottom: '15px',
        textAlign: 'center',
        marginTop:'50px'
    
      }
    
})
