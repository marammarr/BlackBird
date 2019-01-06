import React, { Component } from 'react';
import { 
 Container, 
 Content,
 Form, 
 Item, 
 Input, 
 Button, 
 Textarea,
 Text, 
 Label, 
 Icon, 
 ListItem} from 'native-base';
 import  {CheckBox,TouchableHighlight,View} from 'react-native'
 import axios from 'axios';
 import URLAPI from "../../../config/api.config.json"
 import {Picker,StyleSheet} from 'react-native'

export default class AddMatakuliah extends Component {
 constructor(props){
 super(props);

    this.state = {
        formdata: {
            id:'',
            kdMatkul:'',
            nama:'',
            sks:'',
        }
    }
    //this.changeHandler = this.changeHandler.bind(this)
 }

componentDidMount(){
    this.getListData();
}

getListData(){
    //Ambil data jurusan
    
}

kosongkan(){
    this.setState({
        formdata: {
            id:'',
            kdMatkul:'',
            nama:'',
            sks:'',
        }  
    })
}

changeHandler(name,value){
    let tmp=this.state.formdata
    tmp[name]=value
    this.setState({
        formdata:tmp
    })
 }

handlePostClick = () => {
 
        // this.props.navigation.state.params.handlePostClick(nama,nim,alamat)
        
        axios({ method:'POST',url:URLAPI.BASE_URL+URLAPI.ENDPOINTS.MATAKULIAH, 
                headers:{//apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA
                    'Content-Type':'application/json',
                    'Accepted-Language':'application/json'
                },
                data: formdata
        })
        .then(res => {
            alert('Berhasil memasukkan data!')
            this.kosongkan();
        })
        .catch(err => {
            alert("Terdapat kesalahan, "+err.message)
            console.log("Error : "+JSON.stringify(err))
            console.log("Formdata : "+JSON.stringify(formdata))
            throw err;
        });
 }

render() {
 return (
 <Container>
 <Content>
 <Icon style={{marginTop : 20,marginBottom:10, alignSelf:"center", backgroundColor:"#1e88e5"}} type="FontAwesome" name="book" />
 <Form style={{marginRight:20, marginLeft:5}}>
{/*  <Item floatingLabel> */}
 <Label>KODE</Label>
 <Input style={styles.bg_abu2} value={this.state.formdata.kode} onChangeText={(teks)=>this.changeHandler("kdMatkul",teks)} name="kdMatkul" required/>

 <Label>NAMA MATAKULIAH</Label>
 <Input style={styles.bg_abu2} value={this.state.formdata.nim} onChangeText={(teks)=>this.changeHandler("nama",teks)} name="nama" required/>
 
<Label>JUMLAH SKS</Label>
<Input keyboardType="numeric" style={styles.bg_abu2} value={this.state.formdata.sks} onChangeText={(teks)=>this.changeHandler("sks",teks)} name="sks" required/>

 </Form>
 <Button block backgroundColor="green" onPress={this.handlePostClick}>
 <Text>SIMPAN</Text>
 </Button>
 </Content>
 </Container>
 );
 }
}
const styles = StyleSheet.create({
    bg_abu2: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    }
});