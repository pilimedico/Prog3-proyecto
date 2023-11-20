import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image, Modal } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../firebase/config'
import Post from '../components/Post'


export default class MiPerfil extends Component {
  constructor(props){
    super(props)
    this.state={
      usuarios:[], 
      posteos: [],
      mostrarModal: false,
      postABorrar: null
    }
  }

  componentDidMount(){
    db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot((docs)=>{
        let arrDocs = []
        docs.forEach((doc) => {
          arrDocs.push({
            id:doc.id,
            data: doc.data()
          })
        })

        this.setState({
          usuarios : arrDocs
        })
  
      })
    db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot((docs)=>{
        let arrPosts = []
        docs.forEach((doc)=> {
          arrPosts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        
        this.setState({
          posteos: arrPosts
        })
      })
  }

eliminarPost(item){  //le pasamos como parametro postId que luegotomata el id de este posteo
db.collection('posts').doc(item.id).delete()
}

confirmarEliminarPost(item) {
  this.setState({ mostrarModal: true, postABorrar: item });
}

realizarEliminarPost() {
  this.eliminarPost(this.state.postABorrar);
  this.setState({ mostrarModal: false, postABorrar: null });
}

cancelarEliminarPost() {
  this.setState({ mostrarModal: false, postABorrar: null });
}




//buscarlo, obtener id y eliminarlo
// o con snapshot
eliminarPerfil(){
  db.collection('users')
  .where('owner','==',auth.currentUser.email)


} 
  logout(){
    auth.signOut()
    this.props.navigation.navigate('Register')
  }

  render() {
    return (
      <View style = {styles.container}>
      <Text style = {styles.tituloPerfil2}> Mi Perfil: </Text>
       <Text style = {styles.tituloPerfil}> Mis datos: </Text>
       
       <FlatList
            data={this.state.usuarios}
            keyExtractor={(item)=> item.id.toString() }
            renderItem={({item}) => <View>
              { item.data.fotoPerfil ?
              <Image
              source={item.data.fotoPerfil}
              style={styles.img}
              resizeMode='contain'
            />:
            ''
              }
              
              
              <Text style = {styles.letraPerfil}>Mail: {item.data.owner}</Text>
              <Text style = {styles.letraPerfil}>Nombre: {item.data.name}</Text>
              {item.data.minibio ?
                                <Text style = {styles.letraPerfil} >Minibio: {item.data.minibio}</Text>
                                :
                                ''
                            }
            
              </View>
               }
          />
          <Text style = {styles.tituloPerfil}> Posteos: </Text>
           <Text  style = {styles.letraPerfil}>Cantidad de posteos: {this.state.posteos.length}</Text>
            <FlatList
            data={this.state.posteos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
                <View>
                    <Post navigation={this.props.navigation} data={item.data} id={item.id} />
                    <TouchableOpacity
                  style={styles.boton}
                  onPress={() => this.confirmarEliminarPost(item)}>
                  <Text style={styles.letraBoton2}>Eliminar posteo</Text>
                </TouchableOpacity>
                </View>
            }
            />
            <Modal 
      animationType="slide" 
      transparent={true}  
      visible={this.state.mostrarModal}>
          <View >
          <View style  = {styles.containerModal} >
            <Text style  = {styles.letraPerfil}>
             ¿Seguro quieres eliminar este post?
            </Text>
            <TouchableOpacity
              onPress={() => this.realizarEliminarPost()}
              style = {styles.boton2}
            >
              <Text style = {styles.letraBoton2} >Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.cancelarEliminarPost()}
              style = {styles.boton2}
            >
              <Text style = {styles.letraBoton2} > Rechazar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>



       <TouchableOpacity
          
          onPress={()=> this.logout()}
          >
            <Text style = {styles.letraboton}>Cerrar sesión</Text>
          </TouchableOpacity>

       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF0F5'
  },
  
  tituloPerfil : {
    color: '#FF69B4',
    fontSize: '40px',
    marginTop: '20px'

  },
  tituloPerfil2 : {
    color: '#FF69B4',
    fontSize: '70px',
    marginBottom: '10px'

  },
  letraPerfil: {
    fontSize:'large',
    margin: '16px'
  },
  letraboton: {
    fontSize:'30px',
    margin: '10px',
    color: 'red',
    fontSize:'50px'
  },
  boton: {
    backgroundColor: '#E5A3E2',
    padding: 20
  },
  boton2: {
    backgroundColor: '#A055BA',
    padding: 20,
    margin: 20
  },
  containerModal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#8C29AF'

    },
  letraBoton2:{
    color: 'white',
    textAlign: 'center'
  },
  img: {
    width:'200px',
    height:'200px',
    borderRadius: '500px'

  }
})
