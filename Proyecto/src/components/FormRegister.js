import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { Component } from "react";
import { db, auth } from "../firebase/config";

export default class FormRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      minibio: "",
    };
  }
  //usamos auth dentro del metodo registrarUsuario que recibe como parametro el name,email y password para autenticar al usuario en nuestra firebase
  //usamos auth dentro del metodo registrarUsuario que recibe como parametro el name,email y password para autenticar al usuario en nuestra firebase
  registrarUsuario(name, email, password, minibio) {
    if (name == "") {
      alert("El campo name esta vacío");
    }
    if (password == "") {
      alert("El campo password esta vacío");
    }
    if (email == "") {
      alert("El campo email esta vacío");
    }
    if (name != "" && password != "" && email != "") {
      auth.createUserWithEmailAndPassword(email, password)
      .then((user) =>
        db
          .collection("users")
          .add({
            //como todos los metodos de firebase son promesas le agregamos then y catch
            owner: email,
            createdAt: Date.now(),
            name: name,
            minibio: minibio,
            fotoPerfil: "",
          })
          .then((resp) => {
              this.props.navigation.navigate('InfoAdicionalUser', {docId: resp.id})
          })

        
          
      )
      .catch((err) =>
            alert("No se ha podido registrar, ha habido un error: " + err)
          )
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.tituloRegister}>Registrese a la app</Text>
        <View>
          <TextInput
            //pidiendo el nombre

            style={styles.input}
            placeholder="Dinos tu nombre"
            keyboardType="default" //para que el usuario escriba lo que quiera
            value={this.state.name} //lo conectamos ocn nuestro estado
            onChangeText={(text) => this.setState({ name: text })}

            //le pasamos el callback a ultilziar. Primero obtenemos lo que obtiene el usuario por parametro text
            //cada cambio que genere el usuario lo guardara en ese parametro text y lo tenemos listo para usar
            //actualizamos el valor del state por el valor que ingresa el usuario en el formulario
          />

          <TextInput
            //pidiendo el mail

            style={styles.input}
            placeholder="Dinos tu mail"
            keyboardType="email-address" //para que el usuario ingrese con el mail
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
          />

          <TextInput
            //pidiendo miibio
            style={styles.input}
            placeholder="Crea una minibio"
            value={this.state.minibio}
            onChangeText={(text) => this.setState({ minibio: text })}
          />

          <TextInput
            //pidiendo la contraseña

            style={styles.input}
            placeholder="Dinos tu contraseña"
            keyboardType="default"
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
          />

          <Text style={styles.textLink}> ¿Tienes una cuenta? </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
            style={styles.textLink}
          >
              <Text style={styles.textLogueate} >Logueate aquí! </Text>
            
          </TouchableOpacity>

          {this.state.name != "" &&
          this.state.email != "" &&
          this.state.password != "" ? (
            <TouchableOpacity
              onPress={() =>
                this.registrarUsuario(
                  this.state.name,
                  this.state.email,
                  this.state.password,
                  this.state.minibio
                )
              }
              style={styles.btn}
            >
              <Text style={styles.textBtn}> Registrame ahora!!</Text>
            </TouchableOpacity>
          ) : (
            <>
              <Text style={styles.textNoBoton}>
                Complete todos los campos obligatorios para poder enviar
              </Text>
            </>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#DA70D6",
    marginBottom: 24,
    height: "50px",
    width: "80%",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#D8BFD8",
    padding: 25,
  },
  textBtn: {
    color: "white",
    alignSelf: "center",
    fontSize: "large",
  },
  textLink: {
    marginBottom: 20,

    fontSize: "50px",
    margin: "16px",
    textAlign: "center",
    color: "#D87093",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF0F5",
  },
  textNoBoton: {
    color: "white",
    alignSelf: "center",
    fontSize: "large",
    backgroundColor: "#D8BFD8",
    padding: 25,
  },
  textLogueate: {
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
