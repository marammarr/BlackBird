/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
//import {Platform, StyleSheet, Text, View} from 'react-native';
//import {StackMahasiswa,NavBot} from "./src/Navigator/RootStack"
/* import Login from './src/Login'
import {NavigationActions} from 'react-navigation'*/
import { Root } from 'native-base';
import { createStackNavigator, createAppContainer, createBottomTabNavigator,createSwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

import ListMahasiswa from './src/Mahasiswa/ListMahasiswa'
import AddMahasiswa from './src/Mahasiswa/AddMahasiswa'
import EditMahasiswa from './src/Mahasiswa/EditMahasiswa'
import ListKrs from './src/KRS/ListKrs'
import AddKrs from './src/KRS/AddKrs'
import EditKrs from './src/KRS/EditKrs'
import Login from './src/Login'
import Signup from './src/Signup'
import Pengaturan from './src/pages/Pengaturan/Pengaturan'

class App extends Component {
  render() {
    return (
      <StackMahasiswa />
    );
  }
}
const StackMahasiswa = createStackNavigator(
  {
     List : {
       screen: ListMahasiswa,
       navigationOptions:{
         title: 'Mahasiswa'
       }
     },
     Add : {
      screen: AddMahasiswa,
      navigationOptions:{
        title: 'Tambah Mahasiswa'
      }
    },
     Edit : {
      screen: EditMahasiswa,
      navigationOptions:{
        title: 'Edit Mahasiswa'
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
)

const StackKrs = createStackNavigator(
  {
     List : {
      screen: ListKrs,
      navigationOptions:{
        title: 'KRS'
      }
    },
     Add : {
        screen: AddKrs,
        navigationOptions:{
        title: 'Tambah KRS'
      }
    },
     Edit : {
      screen: EditKrs,
      navigationOptions:{
        title: 'Edit KRS'
      }
    }
  }
 )

 const StackPengaturan = createStackNavigator(
   {
      Pengaturan: Pengaturan
   }
 )

const RouteLog = createStackNavigator(
  {
      Login : Login,
      Signup : Signup
  }
)

const NavBot = createBottomTabNavigator(
  {
      //RootStack : RootStack,
      Mahasiswa : {
          screen: StackMahasiswa,
          navigationOptions: {
              tabBarIcon: ({ horizontal, tintColor }) =>
                  <Icon name="user-graduate" size={horizontal?20:25} color={tintColor} />
          }
      },
      KRS : {
          screen: StackKrs,
          navigationOptions: {
              tabBarIcon: ({ horizontal, tintColor }) =>
                  <Icon name="address-card" size={horizontal?20:25} color={tintColor} />
          }
      },
      Pengaturan : {
          screen: StackPengaturan,
          navigationOptions: {
              tabBarIcon: ({ horizontal, tintColor }) =>
                  <Icon name="cog" size={horizontal?20:25} color={tintColor} />
          }
      },
  },
  {
      tabBarOptions:{
          activeTintColor: 'orange',
          inactiveTintColor: 'gray'
      }
  }
  
)

const pindahNavigator = createSwitchNavigator(
  {
      Luar : RouteLog,
      Dalam : NavBot
  },
  {
      initialRouteName: 'Luar'
  }    
)

export default createAppContainer(pindahNavigator)