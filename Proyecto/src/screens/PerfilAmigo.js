import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../firebase/config'
import Post from '../components/Post'

export default class PerfilAmigo extends Component {
  constructor(props){
    super(props)
    this.state = {
      usuario: [],
      posteos: []
    }
  }
  componentDidMount(){
    db.collection('users')
    .where('owner', '==', this.props.route.params.user)
    .onSnapshot((docs)=> {
      let arrDocs = []
      docs.forEach((doc)=> {
        arrDocs.push({
          id: doc.id,
          data: doc.data()
        })
      })
      .catch(err => console.log(err)) 
      
      this.setState({
        usuario : arrDocs
      } , () => console.log(this.state.usuario))
      
    })
    
    db.collection('posts')
    .where('owner','==', this.props.route.params.user) //queremos los posteos del usuario solicitado
    .onSnapshot((docs) => {
      let arrPosteos = []
      docs.forEach((doc)=> {
        arrPosteos.push({
          id: doc.id,
          data: doc.data()
        })
      })
      this.setState({
        posteos: arrPosteos
      })
    })
    
    
  }
  render() {
    return (
      <View style = {styles.container}>
         
                    <FlatList
                        data={this.state.usuario}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => 
                        <View>
                            <Text  style = {styles.tituloPerfil}>Usuario: {item.data.name}</Text>
                            <Text style = {styles.letraPerfil}>Email: {item.data.owner}</Text>
                            {item.data.minibio ?
                                <Text style = {styles.letraPerfil}>Minibio: {item.data.minibio}</Text>
                                :
                                ''
                            }
                            {item.data.fotoPerfil != '' ?
                                <Image
                                    source={item.data.fotoPerfil}
                                    style = {styles.img}
                                    resizeMode='contain'
                                />
                                :
                                ''
                            }
                            
                        </View>
                        }
                    />
                     
                     
                       <Text style = {styles.letraPerfil}>Posts: {this.state.posteos.length} </Text>
                       <FlatList
                        data={this.state.posteos}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) =>
                            
                                <Post navigation={this.props.navigation} data={item.data} id={item.id} />
                            
                        }
                    />
                
                     
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
  img : {
    borderRadius: '50%',
  width: '200px'
  },
  letraCrear: {
    fontSize:'50px',
    margin: '16px',
    textAlign: 'center',
    color: '#D87093'
}
})