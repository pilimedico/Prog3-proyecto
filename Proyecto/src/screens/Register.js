import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'
import { auth } from '../firebase/config'

export default class Register extends Component {
  constructor(props){
    super(props)
  }

   componentDidMount(){
    auth.onAuthStateChanged(( user )=> {
      if(user !== null){
        this.props.navigation.navigate('TabNavigation') //si ya tiene cuenta que vaya directo al TabNavigation
      }
    })
  } 

  render() {
    return (
      <View style = {styles.container}> 
      <Text style={styles.tituloRegister}>Registrese a la app</Text>
        <FormRegister navigation = {this.props.navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    

    backgroundColor: '#FFF0F5'
  },
  tituloRegister : {
    color: '#FF69B4',
    fontSize: '80px',
    marginBottom: '15px',
    textAlign: 'center',
    marginTop:'50px'

  },
})