import React, { Component } from 'react';
import { 
 Container, 
 Content,
 Title,
 DatePicker,
 Form, 
 Item, 
 Input, 
 Button, 
 Textarea,
 Text, 
 Label, 
 Thumbnail, 
 ListItem} from 'native-base';
 import  {CheckBox,TouchableHighlight,View} from 'react-native'
 import axios from 'axios';
 import URLAPI from "../../config/api.config.json"
 import {Picker,StyleSheet} from 'react-native'

export default class AddKrs extends Component {
 constructor(props){
 super(props);

    this.state = {
        formdata: {
            id:'',
            kode:'',
            nim:'',
            kdMatkul:[],
            sks:'',
            semester:''
        },
        jurusan: [],
        kota: [],
        provinsi: [],
        matakuliahs : [
            {name: 'kdMatkul', id:"mk01", isChecked: false, label: 'Fisika Dasar'},
            {name: 'kdMatkul', id:"mk02", isChecked: false, label: 'Kimia Dasar'},
            {name: 'kdMatkul', id:"mk03", isChecked: false, label: 'Bahasa Inggris'},
            {name: 'kdMatkul', id:"mk04", isChecked: false, label: 'Bahasa Indonesia'},
            {name: 'kdMatkul', id:"mk05", isChecked: false, label: 'Agama Islam'},
            {name: 'kdMatkul', id:"mk06", isChecked: false, label: 'Sosial Budaya'}
        ],
        cekboxSemua: false 
    }
    //this.changeHandler = this.changeHandler.bind(this)
    this.cekSmua = this.cekSmua.bind(this)
 }

componentDidMount(){
    this.getListData();
}

getListData(){
    //Ambil data jurusan
    axios({ method:'GET',url:URLAPI.BASE_URL+URLAPI.ENDPOINTS.JURUSAN.UTAMA
    })
    .then(res => {
        this.setState({
            jurusan: res.data
        })
    })
    .catch(err => {
        console.log("Error : "+err.message+", "+err.status)
        throw err;
    });
    //Ambil data kota
    axios({ method:'GET',url:URLAPI.BASE_URL+URLAPI.ENDPOINTS.KOTA
    })
    .then(res => {
        this.setState({
            kota: res.data
        })
    })
    .catch(err => {
        console.log("Error : "+err.message+", "+err.status)
        throw err;
    });
    //Ambil data provinsi
    axios({ method:'GET',url:URLAPI.BASE_URL+URLAPI.ENDPOINTS.PROVINSI
    })
    .then(res => {
        this.setState({
            provinsi: res.data
        })
    })
    .catch(err => {
        console.log("Error : "+err.message+", "+err.status)
        throw err;
    });
}

kosongkan(){
    this.setState({
        formdata: {
            id:'',
            kode:'',
            nim:'',
            kdMatkul:'',
            sks:'',
            semester:''
        }  
    })
    this.state.matakuliahs.map((row)=>
        row.isChecked=false
    )
}

cekSmua = (e) => {
    let matkuls = this.state.matakuliahs
        matkuls.forEach(matkul => matkul.isChecked =  
        e.target.value)
        if(e.target.value){ 
            this.state.formdata.kdMatkul=[]
            matkuls.forEach(matkul => 
            this.state.formdata.kdMatkul.push(matkul.value))
        }else{
            this.state.formdata.kdMatkul=[]
        } 
        this.setState({
            matakuliahs: matkuls
        })
    alert(this.state.cekboxSemua+' : '+JSON.stringify(this.state.matakuliahs))
}

changeHandler(name,value){
    let tmp=this.state.formdata
    tmp[name]=value
    this.setState({
        formdata:tmp
    })
 }

 checkboxHandler(name, isChecked){
     let tmp = this.state.formdata
    this.state.matakuliahs.map((row,i)=> //Perulangan matakuliah
    {
        if(row.id===name){ //klo value row sama ama value objek pilih
            row.isChecked=!row.isChecked //Ubah nilai isChecknya
            //alert('mengubah '+row.id+' menjadi '+row.isChecked)
            if(row.isChecked)   // Jika nilai isChecknya true 
                tmp.kdMatkul.push(name)
            else    //Kalo false, hapus
                tmp.kdMatkul.splice(tmp.kdMatkul.indexOf(name),1)
        }
    })
    this.setState({
        formdata: tmp
    })
    //console.warn(JSON.stringify(this.state.formdata)+", "+JSON.stringify(this.state.matakuliahs))
 }

handlePostClick = () => {
 
    if(this.state.formdata.kdMatkul.length>0){
        // this.props.navigation.state.params.handlePostClick(nama,nim,alamat)
        let data = []
        let tmp = this.state.formdata
        this.state.formdata.kdMatkul.map((row)=>
            {
                let json = {
                    "id": "",
                    "kode": tmp.kode,
                    "nim": tmp.nim,
                    "kdMatkul": row,
                    "sks": tmp.sks,
                    "semester": tmp.semester
                } 
                data.push(json)
            }
        )
        //console.warn(JSON.stringify(tmp))

        axios({ method:'POST',url:URLAPI.BASE_URL+URLAPI.ENDPOINTS.KRS.multiInsert, 
                headers:{//apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA
                    'Content-Type':'application/json',
                    'Accepted-Language':'application/json'
                },
                data: data
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

    }else{
        alert('Mohon pilih matakuliah')
    }
 }

render() {
 return (
 <Container>
 <Content>
 <Thumbnail style={{marginTop : 20,marginBottom:10, alignSelf:"center", backgroundColor:"#1e88e5"}} source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gnome-stock_person.svg/1024px-Gnome-stock_person.svg.png"}} />
 <Form style={{marginRight:20, marginLeft:5}}>
{/*  <Item floatingLabel> */}
 <Label>KODE</Label>
 <Input style={styles.bg_abu2} value={this.state.formdata.kode} onChangeText={(teks)=>this.changeHandler("kode",teks)} name="kode" required/>

 <Label>NIM</Label>
 <Input style={styles.bg_abu2} value={this.state.formdata.nim} onChangeText={(teks)=>this.changeHandler("nim",teks)} name="nim" required/>

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
<Input keyboardType="numeric" style={styles.bg_abu2} value={this.state.formdata.sks} onChangeText={(teks)=>this.changeHandler("sks",teks)} name="sks" required/>

 <Label>Semester</Label>
 <Input keyboardType="numeric" style={styles.bg_abu2} value={this.state.formdata.semester} onChangeText={(teks)=>this.changeHandler("semester",teks)} name="semester" required/>
 
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