import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormLogin from '../components/FormLogin'
import { auth } from '../firebase/config'

export default class Login extends Component {
  constructor(props){
    super(props)
  }

  

 /*  componentDidMount(){
    auth.onAuthStateChanged(( user )=> {
      if(user !== null){
        this.props.navigation.navigate('TabNavigation') //si ya esta logueado que vaya al TabNavigation (home)
      }
    })
  } */

  render() {
    return (
      <View  >
        <FormLogin navigation = {this.props.navigation} />
        
      </View>
    )
  }
}