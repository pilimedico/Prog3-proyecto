import { Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import React, { Component } from 'react'
import FormBuscador from '../components/FormBuscador'
import {db,auth} from '../firebase/config'


export default class Buscador extends Component {
  constructor(props){
    super(props)
    this.state = {
      usuarios: [],
      backup: [],
      valor: ''
    }
  }

  componentDidMount(){
    db.collection('users')
    .onSnapshot((docs)=> {
      let arrUsuarios = []
      docs.forEach((doc)=> {
        arrUsuarios.push({
          id: doc.id,
          data: doc.data()
        })
      })
      this.setState({
        usuarios: arrUsuarios,
        backup: arrUsuarios
      }, console.log(this.state.usuarios))
    })
  }

  usuarioFiltrado(name){
    let usersFiltrados = this.state.backup.filter((elm) =>
    elm.data.name.toLowerCase().includes(name.toLowerCase())
    )
    this.setState({
      usuarios: usersFiltrados
    })
  }

  actualizarBusqueda(valor){
    this.setState({
      valor: valor
    })
  }

  irAPerfil(owner){
    console.log(owner);
      {owner == auth.currentUser.email ? 
          this.props.navigation.navigate('MiPerfil')
        : 
        this.props.navigation.navigate('PerfilAmigo', { user: owner });
      }
    
    
    
  }

  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.tituloBuscador}>Buscador</Text>
        
        <FormBuscador 

        usuarioFiltrado = {(name) => this.usuarioFiltrado(name)}
        actualizarBusqueda = {(valor) => this.actualizarBusqueda(valor)}  
        />
        {this.state.valor != '' ? (
          this.state.usuarios.length != 0 ?
            <FlatList
              data={this.state.usuarios}
              renderItem={({ item }) =>
                <View >
                  <TouchableOpacity onPress={() => this.irAPerfil(item.data.owner)}>
                   
                    <Text style = {styles.letraBuscador} >{item.data.owner}</Text>
                  </TouchableOpacity>
                </View>}
              keyExtractor={(item) => item.id.toString()}
            />
            :
            <Text style = {styles.letraBuscador}>No hay resultados de su búsqueda</Text>
        ) : (
          <Text style = {styles.letraBuscador}>Aquí apareceran los resultados de búsqueda</Text>
        )}
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
  tituloBuscador : {
    color: '#FF69B4',
    fontSize: '80px'

  },
  letraBuscador: {
    fontSize:'large',
    margin: '16px'
  },
})