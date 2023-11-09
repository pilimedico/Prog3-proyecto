import { Text, View } from 'react-native'
import React, { Component } from 'react'
import {db} from "../firebase/config"
import { FlatList } from 'react-native-web'


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
      <View>

        <FlatList

        data = {this.state.posteos}
        keyExtractor = {(item) => item.id.toString()} 
        renderItem = { ({item}) => <Post  navigation= {this.props.navigation} data={item.data} id={item.id} />}
        
        />

        
        
        
      </View>
    )
  }
}