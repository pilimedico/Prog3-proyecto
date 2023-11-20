import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'
import FormComentarios from '../components/FormComentarios'


export default class Comentarios extends Component {

  constructor(props){
    super(props)
    this.state = {
      dataPosteo: null,
      comentarios: []
    }
  }

  componentDidMount(){
    db
    .collection('posts')
    .doc(this.props.route.params.id)
    .onSnapshot((doc)=> { //observamos un documento en especifico (el que coincide el id con this.props.route.params.id )
      this.setState({dataPosteo: doc.data()}, ()=>{
        this.setState({
          comentarios: this.state.dataPosteo.comentarios.reverse()
        })
      })
    })
    
    
  }

  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.tituloComentarios}> Comentarios: </Text>
        
        

        {
          this.state.dataPosteo != null  ?
          this.state.comentarios.length > 0 ?
         
          <FlatList 

          data= {this.state.comentarios}
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
    fontSize: '40px',
    marginBottom: 20

  },
  letraComentario: {
    fontSize:'large',
    margin: '16px'
  }
})