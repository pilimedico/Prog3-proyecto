import { Text, View, TouchableOpacity,StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormLogin from '../components/FormLogin'
import { auth } from '../firebase/config'

export default class Login extends Component {
  constructor(props){
    super(props)
  }

  

  componentDidMount(){
    auth.onAuthStateChanged(( user )=> {
      if(user !== null){
        this.props.navigation.navigate('TabNavigation') //si ya esta logueado que vaya al TabNavigation (home)
      }
    })
  } 

  render() {
    return (
      <View style={styles.container} >
        <FormLogin navigation = {this.props.navigation} />
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    

    backgroundColor: '#FFF0F5'
  }
})