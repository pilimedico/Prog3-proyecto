import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../firebase/config'
import Post from '../components/Post'


export default class MiPerfil extends Component {
  constructor(props){
    super(props)
    this.state={
      usuarios:[], 
      posteos: []
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
        }, () => console.log(this.state.usuarios))
  
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

eliminarPost(postId){  //le pasamos como parametro postId que luegotomata el id de este posteo
db.collection('posts').doc(postId).delete()
}

/* eliminarPerfil(){
  db.collection('users')
  .where('owner','==',auth.currentUser.email)

} */
  logout(){
    auth.signOut()
    this.props.navigation.navigate('Register')
  }

  render() {
    return (
      <View style = {styles.container}>
        
       <Text style = {styles.tituloPerfil}> Mis datos: </Text>
       
       <FlatList
            data={this.state.usuarios}
            keyExtractor={(item)=> item.id.toString() }
            renderItem={({item}) => <View>
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
                  onPress={() => this.eliminarPost(item.id)}>
                  <Text style={styles.letraBoton2}>Eliminar posteo</Text>
                </TouchableOpacity>
                </View>
            }
            />



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
    fontSize: '80px',
    marginBottom: '50px'

  },
  letraPerfil: {
    fontSize:'large',
    margin: '16px'
  },
  letraboton: {
    fontSize:'large',
    margin: '10px',
    color: 'red',
    fontSize:'50px'
  },
  boton: {
    backgroundColor: '#E5A3E2',
    padding: 20
  },
  letraBoton2:{
    color: 'white',
    textAlign: 'center'
  }
})