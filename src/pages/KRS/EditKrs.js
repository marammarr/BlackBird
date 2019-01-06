import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
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
    Thumbnail, 
    ListItem} from 'native-base';
import URLAPI from "../../../config/api.config.json"


export default class EditKrs extends Component {
    constructor(props){
        super(props)
        this.state={
            krs:{
                id:'',
                kode:'',
                nim:'',
                kdMatkul:[],
                sks:'',
                semester:''
            },
            jurusan: [],
            matakuliahs : [
                {name: 'kdMatkul', id:"mk01", isChecked: false, label: 'Fisika Dasar'},
                {name: 'kdMatkul', id:"mk02", isChecked: false, label: 'Kimia Dasar'},
                {name: 'kdMatkul', id:"mk03", isChecked: false, label: 'Bahasa Inggris'},
                {name: 'kdMatkul', id:"mk04", isChecked: false, label: 'Bahasa Indonesia'},
                {name: 'kdMatkul', id:"mk05", isChecked: false, label: 'Agama Islam'},
                {name: 'kdMatkul', id:"mk06", isChecked: false, label: 'Sosial Budaya'}
            ],
        }
    }
    
    componentWillReceiveProps(){
        this.setState({
            krs: this.props.navigation.state.params.item
        });
        this.getListData();
    }

    changeHandler(name,value){
        let tmp=this.state.krs
        tmp[name]=value
        this.setState({
            krs:tmp
        })
     }

     handlePostClick = () => {

        axios({ method:'PUT',url:URLAPI.BASE_URL+URLAPI.ENDPOINTS.KRS.UTAMA, 
                headers:{//apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA
                    'Content-Type':'application/json',
                    'Accepted-Language':'application/json'
                },
                data: this.state.krs
        })
        .then(res => {
            alert('Berhasil merubah data!')
            this.props.navigation.navigate('ListKrs')
        })
        .catch(err => {
            alert("Terdapat kesalahan, "+err.message)
            console.log("Error : "+JSON.stringify(err))
            console.log("KRS : "+JSON.stringify(this.state.krs))
            throw err;
        });
    
        
     }
 render() {
 return (
    <Container>
    <Content>
    <Thumbnail style={{marginTop : 20,marginBottom:10, alignSelf:"center", backgroundColor:"#1e88e5"}} source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gnome-stock_person.svg/1024px-Gnome-stock_person.svg.png"}} />
    <Form style={{marginRight:20, marginLeft:5}}>
   {/*  <Item floatingLabel> */}
    <Label>KODE</Label>
    <Input style={styles.bg_abu2} value={this.state.krs.kode} onChangeText={(teks)=>this.changeHandler("kode",teks)} name="kode" required/>
   
    <Label>NIM</Label>
    <Input style={styles.bg_abu2} value={this.state.krs.nim} onChangeText={(teks)=>this.changeHandler("nim",teks)} name="nim" required/>
   
    <Label>Kode Matakuliah</Label>
    <View
     style={{
       borderBottomColor: 'black',
       borderBottomWidth: 1,
     }}
   />
   <View style={{flexDirection:'row'}}>
       {/* <CheckBox value={this.state.cekboxSemua}/> {/* onValueChange={(value)=>this.cekSmua} /> */}
       {/* <Text>Pilih Semua</Text> */}
   </View>
   <View
     style={{
       borderBottomColor: 'black',
       borderBottomWidth: 1,
     }}
   />
    {
       this.state.matakuliahs.map((row,x)=>
           <View key={x} style={{flexDirection:'row'}}>
           <CheckBox value={row.isChecked} onValueChange={(value)=>this.checkboxHandler(row.id,value)} />
           <Text style={{marginTop: 5}}> {row.label}</Text>
           </View>
       )
   }
   <Label>SKS</Label>
   <Input keyboardType="numeric" style={styles.bg_abu2} value={this.state.krs.sks} onChangeText={(teks)=>this.changeHandler("sks",teks)} name="sks" required/>
   
    <Label>Semester</Label>
    <Input keyboardType="numeric" style={styles.bg_abu2} value={this.state.krs.semester} onChangeText={(teks)=>this.changeHandler("semester",teks)} name="semester" required/>
    
    </Form>
    <Button block backgroundColor="green" onPress={this.handlePostClick}>
    <Text>SIMPAN PERUBAHAN</Text>
    </Button>
    </Content>
    </Container>
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
});