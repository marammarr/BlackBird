import React, {Component} from 'react';
import {TouchableHighlight, Image, Button, Platform, StyleSheet, Text, View, TextInput} from 'react-native';
import {Icon} from 'native-base'
import axios from 'axios';
import api from '../config/api.config.json'
import {StackActions,NavigationActions} from 'react-navigation'

const instructions = Platform.select({
 ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
 android:
 'Double tap R on your keyboard to reload,\n' +
 'Shake or press menu button for dev menu',
});

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    resetLaluPindahNavigasi(targetRoute) {
        const resetAction = StackActions.reset({
            index: 0, // <-- currect active route from actions array
            key: null,
            actions: [
              NavigationActions.navigate({ routeName: targetRoute }),
            ],
          });
          this.props.navigation.dispatch(resetAction);
      }
      resetLaluPindahNavigasi2(targetRoute) {
        this.props.navigation.navigate({ routeName: targetRoute })
      }
    async onClickLogin(viewId){
        //Login
        if(this.state.username!=='' && this.state.password!==''){
            try {
                //let result = await axios(option)
                let result = await axios(
                    {
                        method: 'POST',
                        url:api.BASE_URL+api.ENDPOINTS.LOGIN,
                        data:{username:this.state.username,password:this.state.password},
                        headers: {
                            'Content-Type': 'application/json',
                            'Accepted-Language': 'application/json'
                        }}
                    )
                    
                //alert('test '+JSON.stringify(result))
                if(result.data.parameterNilai===1){
                    console.debug('Login berhasil')
                    
                    this.resetLaluPindahNavigasi2('Dalam')
                }else{
                    alert('Username atau password salah')
                }
            } catch (error) {
                alert(error)
                throw error
                console.log(error.response.data)
    
            }
        }else{
            console.warn('Jangan ada yang kosong')
        }
    }
 render() {
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>LOGIN</Text>
            <View style={styles.inputContainer}>
                <Icon style={styles.inputIcon} name="md-person" />
                <TextInput style={styles.inputs}
                    placeholder="Username"
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    onChangeText={(username) => this.setState({username})} />
                
            </View>
            <View style={styles.inputContainer}>
                {/* <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}} /> */}
                <Icon style={styles.inputIcon} name="md-key" />
                <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    onChangeText={(password) => this.setState({password})} />
                
            </View>
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickLogin('login')}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableHighlight>
        <TextInput />
        </View>
    );
 }
}

const styles = StyleSheet.create({
 container: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 backgroundColor: '#F5FCFF',
 
 },
 welcome: {
 fontSize: 20,
 textAlign: 'center',
 margin: 10,
 },
 instructions: {
 textAlign: 'center',
 color: '#333333',
 marginBottom: 5,
 },
 inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:250,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
},
inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
},
inputIcon:{
  width:30,
  height:30,
  marginLeft:15,
  justifyContent: 'center'
},
buttonContainer: {
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:20,
  width:250,
  borderRadius:30,
},
loginButton: {
  backgroundColor: '#00b5ec',
},
loginText: {
  color: 'white',
}
});