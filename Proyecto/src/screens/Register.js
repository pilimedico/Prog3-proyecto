import { Text, View } from 'react-native'
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
      <View>
        <FormRegister navigation = {this.props.navigation} />
      </View>
    )
  }
}