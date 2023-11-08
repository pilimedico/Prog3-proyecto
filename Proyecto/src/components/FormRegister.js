import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'

class FormRegister extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            minibio: ""

        }
    }
//usamos auth dentro del metodo registrarUsuario que recibe como parametro el name,email y password para autenticar al usuario en nuestra firebase
    registrarUsuario(name, email, password, minibio){
        auth.createUserWithEmailAndPassword(email, password)
        .then(user => db.collection('users').add({  //como todos los metodos de firebase son promesas le agregamos then y catch
                owner: email,  
                createdAt: Date.now(),
                name: name,
                minibio: minibio
            })
        )
        .then((resp) => console.log(resp)) // .collection tambien retorna una promesa entonces se escribe nuevamente then
        .catch( err => console.log(err))
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
                value= {this.state.email}  
                onChangeText = {(text) => this.setState({email:text})} 
            />

            <TextInput
            //pidiendo miibio
                    style = {styles.input}
                    placeholder='Crea una minibio'
                    value={this.state.minibio}
                    onChangeText={(text) => this.setState({minibio:text})}
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

            <Text
                    style={styles.textLink}
                >
                    ¿Tienes una cuenta? 
                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate('Login')}
                    >
                        Logueate aquí!
                    </TouchableOpacity>
                </Text>


                <TouchableOpacity 
                onPress={()=> this.registrarUsuario(this.state.name, this.state.email, this.state.password, this.state.minibio)}                
                style={styles.btn}>
                    <Text style={styles.textBtn}> Registrame ahora!!</Text>
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
export default FormRegister