import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import {FontAwesome} from "@expo/vector-icons"
import {db, auth} from "../firebase/config"
import firebase from 'firebase'

export default class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            likes : 0,
            estaMiLike : false
        }
    }
  
    //en la prop data recibimos todos los likes que tiene el posteo
    //queremos validar si esta NUESTRO like, para eso usamos el includes que retorna un true o false
    //queremos ver si esta el email del usuario logueado
    //con la validacion puedo setear el estado de si esta el like o no dependiendo lo que sea que llegue por validacionLike
    componentDidMount(){
        let validacionLike = this.props.data.likes.includes(auth.currentUser.email)
        this.setState({
            estaMiLike: validacionLike
        })
    }
  
    //en este metodo actualizamos el documento correspondiente a este posteo
    like(){
        db
        .collection('posts')
        .doc(this.props.id) //corresponde a item.id que fue pasado del componente padre con props (home)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) //actualizo el valor de la propiedad likes. Le paso el mail del usuario logueado
        
        })
        .then((resp) => 

        this.setState({
            estaMiLike : true //si encuentra un like en la propiedad likes del usuario logueado quiere decir que ya esta su like
         })
        
        )
        .then((err) => console.log(err))
    }

    unlike(){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) // elimino ese valor
        
        })
        .then((resp) => 

        this.setState({
            estaMiLike : false 
         })
        
        )
        .then((err) => console.log(err))
    }

    irAComentar(){
        this.props.navigation.navigate('Comentarios', {id : this.props.id}) //
    }


    irAPerfil() {
        {this.props.data.owner == auth.currentUser.email ? 
            this.props.navigation.navigate('MiPerfil')
          : 
          this.props.navigation.navigate('PerfilAmigo', { user: this.props.data.owner });
        }
      }
    
  
    
    render() {
        return (
            
        <View style = {styles.containerPost} >
            <Text style = {styles.tituloPost}>Posteo: </Text>
            <Image
                source={{uri: this.props.data.fotoUrl ? this.props.data.fotoUrl : ''}}
                style={styles.img}
                resizeMode='contain'
            />
            <TouchableOpacity onPress={() => this.irAPerfil()}>
            <Text style = {styles.letrasPost}>Publicado por: {this.props.data.owner}</Text>
        </TouchableOpacity>
           
            <Text style = {styles.letrasPost}>{this.props.data.descripcion}</Text>
            <View>
                
                {
                    this.state.estaMiLike ?
                        <TouchableOpacity
                        onPress={()=> this.unlike()}
                        style = {styles.btn}
                        >
                            <FontAwesome
                            name='heart'
                            color='red'
                            size={24}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                        onPress={()=> this.like()}
                        style = {styles.btn}
                        >
                        <FontAwesome
                        name='heart-o'
                        color='red'
                        size={24}
                        />
                        </TouchableOpacity>
                        
                }
                <Text style = {styles.letrasPost} >Likes: {this.props.data.likes.length}</Text>
            </View>
            <View>
                <TouchableOpacity
                    onPress={()=> this.irAComentar()}
                >
                    <Text style = {styles.letrasPost}>Comentarios: {this.props.data.comentarios.length}</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    containerPost: {
        width: '100%',
        marginBottom: '70px',
        border: '20px'
    },
    
    img: {
        width: '600px',
        height: 300
       
    } ,
    tituloPost: {
        fontSize:'50px',
        margin: '10px',
        textAlign: 'center',
        color: '#D87093'
    },
    letrasPost: {
        fontSize:'20px',
        margin: '10px',
        textAlign: 'center',
        color: '#483D8B'
    },
    btn: {
        alignSelf: 'center'
    }
})