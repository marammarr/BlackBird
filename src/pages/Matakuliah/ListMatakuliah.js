import React, {Component} from 'react';
import {Alert,Platform, StyleSheet, View, StatusBar, TouchableHighlight} from 'react-native';
import {
 Content, 
 Fab, 
 Button, 
 Icon, 
 Spinner, 
 ListItem, 
 Left, 
 Body, 
 Right, 
 Thumbnail, 
 Text } from "native-base"
import axios from "axios"

import ListItems from "../../component/ListItems"
import URLAPI from "../../../config/api.config.json"
import marStyle from "../../../config/style.config"

export default class ListMatakuliah extends Component {
    constructor(props){
    super(props);

    this.state = {
        data : [],
        loading:false
    }
 }

 hapusData(e){
    Alert.alert(
        'Konfirmasi',
        'Anda yakin ingin menghapus data '+e.nama+'?',
        [
          {text: 'NO'/* , onPress: () => console.warn('NO Pressed') */, style: 'cancel'},
          {text: 'YES', onPress: () => 
                {   console.log("tts "+JSON.stringify(e))
                    axios({method:'DELETE',url:URLAPI.BASE_URL+URLAPI.ENDPOINTS.MATAKULIAH, headers:{//apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA
                        'Content-Type':'application/json',
                        'Accepted-Language':'application/json'
                        },
                        data: e
                    })
                    .then(res => {
                        console.log("tts "+JSON.stringify(res.data))
                        this.props.navigation.navigate("List", {
                            handlePostClick:this.handlePostClick
                        })
                    })
                    .catch(err => {
                        console.log("Error : "+err.message+", "+err.status)
                        throw err;
                    })
                }
            },
        ]
      );
 }

 makeRemoteRequest = () => {
    this.setState({loading:true})
    //setTimeout(() => {
        //console.log("test "+URLAPI.BASE_URL+URLAPI.ENDPOINTS.MAHASISWA)
        axios({method:'GET',url:URLAPI.BASE_URL+URLAPI.ENDPOINTS.MATAKULIAH, headers:{
            'Content-Type':'application/json',
            'Accepted-Language':'application/json'
        }})
        .then(res => {
            //console.warn("tts "+JSON.stringify(res.data))
           // alert("tts "+JSON.stringify(res.data))
            const newData = res.data;
            this.setState({
                loading:false,
                data : newData
            })
        })
        .catch(err => {
            console.log("Error : "+err.message+", "+err.status)
            throw err;
        });
    //}, 2500)
    }

   componentDidMount(){
    this.makeRemoteRequest()
    }

renderFooter = () => {
    if(this.state.loading === false) return null;

    return (
        <View>
            <Spinner color='#1e88e5' />
            <Text 
                style={{color:"#aaa", fontSize:12, textAlign:'center', bottom:10}}>
                Mengambil data..
            </Text>
        </View>
    )
 }

renderList = (item,index) => {
    return(
        <ListItem 
            style={{marginRight:20}}
            avatar 
            key={index}
            >
            <Left>
                <Thumbnail style={{backgroundColor:"#1e88e5"}} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gnome-stock_person.svg/1024px-Gnome-stock_person.svg.png' }} />
            </Left>
            <Body>
                <Text>{'Kode : '+item.kdMatkul}</Text>
                <Text note>{'Matakuliah : '+item.nama}</Text>
                <Text note>{'Jumlah SKS : '+item.sks}</Text>
            </Body>
            <Right>
                <TouchableHighlight style={marStyle.sub_btn} onPress={()=>this.props.navigation.navigate('Edit',{item})}>
                    <Icon type="FontAwesome" name="edit"/>
                </TouchableHighlight>
                <TouchableHighlight style={marStyle.sub_btn} onPress={()=>this.hapusData(item)}>
                    <Icon type="FontAwesome" name="trash"/>
                </TouchableHighlight>
            </Right>
        </ListItem>
    )
 }

render() {
    return (
        <View style={styles.container}>
            <StatusBar 
            backgroundColor='black'
            barStyle="light-content"/>

            <View style={{flex: 1}}>
                <ListItems 
                    {...this.props}
                    data={this.state.data}
                    renderList = {this.renderList}
                    renderFooter={this.renderFooter}
                    />
            </View>

            <Fab
            style={{ backgroundColor: '#1e88e5' }}
            position="bottomRight"
            onPress={
            () => this.props.navigation.navigate("Add", {
            handlePostClick:this.handlePostClick
            })}>
                <Icon type="FontAwesome" name="pencil" />
            </Fab>
        </View>
    );
 }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    }
});