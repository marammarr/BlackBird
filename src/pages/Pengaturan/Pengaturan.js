import React, {Component} from 'react'
import {
    Text,
    Button,
    Alert
} from 'react-native'
import { View } from 'native-base';
import {StackActions,NavigationActions} from 'react-navigation'

export default class Pengaturan extends Component{
    constructor(props){
        super(props);

        this.signOut = this.signOut.bind(this)
    }

    signOut(){
        Alert.alert(
            'Konfirmasi',
            'Anda yakin ingin logout?',
            [
                { text: 'Tidak', style: 'cancel'},
                { 
                    text: 'ya', onPress: ()=>
                        this.props.navigation.navigate('Luar')
                }
            ]
            
        )
        //{ routeName: 'Luar'})
        // saran : kalo navigation undefined cek props undefined juga ga
        //kalo iya berati masalah di props
    }

    render(){
        return(
            <View>
                <Text>PENGATURAN</Text>
                <Button title="Logout" color="#841584" onPress={()=>this.signOut()} />
            </View>
            
        )
    }
}