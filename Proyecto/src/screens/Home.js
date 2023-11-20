import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db} from "../firebase/config"
import Post from '../components/Post'


export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      posteos : []
    }
  }

  componentDidMount() {

    db.collection("posts")
    .orderBy("createdAt","desc")
    .onSnapshot(docs=> {
      let arrPosteos = []
      docs.forEach(doc => {
        arrPosteos.push({
          id: doc.id,
          data:doc.data()
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
        <Text style = {styles.tituloHome} >Home</Text>
        <View style = {styles.containerPost}> 
{this.state.posteos.length > 0 ?

        <FlatList

        data = {this.state.posteos}
        keyExtractor = {(item) => item.id.toString()} 
        renderItem = { ({item}) => <Post  navigation= {this.props.navigation} data={item.data} id={item.id} />} //mandamos la prop de navigation para que se pueda colocar el navigation desde un componente con props
        
        />
      :
      false
      }

        
        
</View>
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
  containerPost: {
    flex: 1,
    alignItems: 'center',
    width: '50%'
  },
  tituloHome : {
    color: '#FF69B4',
    fontSize: '80px'

  }
})