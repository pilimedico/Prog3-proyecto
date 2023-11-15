import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'
import FormComentarios from '../components/FormComentarios'


export default class Comentarios extends Component {

  constructor(props){
    super(props)
    this.state = {
      dataPosteo: null
    }
  }

  componentDidMount(){
    db
    .collection('posts')
    .doc(this.props.route.params.id)
    .onSnapshot((doc)=> {
      this.setState({dataPosteo: doc.data()})
    })
    
    
  }

  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.tituloComentarios}> Comentarios: </Text>
        
        

        {
          this.state.dataPosteo != null  ?
          this.state.dataPosteo.comentarios.length > 0 ?
         
          <FlatList 

          data= {this.state.dataPosteo.comentarios}
          keyExtractor={(item)=> item.createdAt.toString()}
          renderItem = { ({item}) =>
          <View> 
            <Text style = {styles.letraComentario}>{item.texto} por: {item.owner} </Text>
          </View> 
        }/>
          :
          <Text>Aun no hay comentarios</Text>
          :
          ''

        }

<Text style = {styles.tituloComentarios}> Deje su comentario: </Text>


        <FormComentarios
        postId = {this.props.route.params.id}
        />
        




      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
    
  },
  
  tituloComentarios : {
    color: '#FF69B4',
    fontSize: '80px'

  },
  letraComentario: {
    fontSize:'large',
    margin: '16px'
  }
})