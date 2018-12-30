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
 import axios from 'axios';
 import URLAPI from "../../config/api.config.json"
 import {Picker,StyleSheet} from 'react-native'

export default class AddKrs extends Component {
 constructor(props){
 super(props);

    this.state = {
        formdata: {
            id:'',
            nim:'',
            nama:'',
            kdjur:'',
            kdkota:'',
            kdprov:'',
            tanggalLahir:''
        },
        jurusan: [],
        kota: [],
        provinsi: []   
    }
    //this.changeHandler = this.changeHandler.bind(this)
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
            nim:'',
            nama:'',
            kdjur:'',
            kdkota:'',
            kdprov:'',
            tanggalLahir:''
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
    /* let tmp = []
    this.state.formdata.kdMatkul.map((row)=>
        {
            let data = this.state.formdata
            data.kdMatkul = row.kdMatkul 
            tmp.push(data)
        }
    ) */
    //console.log(JSON.stringify(tmp))

    axios({ method:'POST',url:URLAPI.BASE_URL+URLAPI.ENDPOINTS.MAHASISWA, 
            headers:{//apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA
                'Content-Type':'application/json',
                'Accepted-Language':'application/json'
            },
            data: this.state.formdata
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
 <Thumbnail style={{marginTop : 20,marginBottom:10, alignSelf:"center", backgroundColor:"#1e88e5"}} source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gnome-stock_person.svg/1024px-Gnome-stock_person.svg.png"}} />
 <Form style={{marginRight:20, marginLeft:5}}>
{/*  <Item floatingLabel> */}
 <Label>Nama</Label>
 <Input style={styles.bg_abu2} value={this.state.formdata.nama} onChangeText={(teks)=>this.changeHandler("nama",teks)} name="nama" required/>

 <Label>NIM</Label>
 <Input style={styles.bg_abu2} value={this.state.formdata.nim} onChangeText={(teks)=>this.changeHandler("nim",teks)} name="nim" required/>

 <Label>Jurusan</Label>
 <Picker
    selectedValue={this.state.formdata.kdjur}
    style={{ height: 50, width: '100%' }+styles.bg_abu2}
    onValueChange={(itemValue, itemIndex) => {
        let j = this.state.formdata
        j['kdjur'] = itemValue
        this.setState({ 
            
            formdata:j
        })
    }
    }>
    <Picker.Item label="== PILIH ==" value="" />
        {
            this.state.jurusan.map((row)=>
                <Picker.Item label={row.nama} value={row.kode} />
            )
        }
        
</Picker>

<Label>Provinsi</Label>
 <Picker
    selectedValue={this.state.formdata.kdprov}
    style={{ height: 50, width: '100%' }+styles.bg_abu2}
    onValueChange={(itemValue, itemIndex) => {
        let p = this.state.formdata
        p['kdprov'] = itemValue
        this.setState({ 
            formdata:p
        })
    }
    }>
        <Picker.Item label="== PILIH ==" value="" />
        {
            this.state.provinsi.map((row)=>
                <Picker.Item label={row.nama} value={row.kode} />
            )
        }
        
</Picker>


<Label>Kota</Label>
 <Picker
    selectedValue={this.state.formdata.kdkota}
    style={{ height: 50, width: '100%' }+styles.bg_abu2}
    onValueChange={(itemValue, itemIndex) => {
        let k = this.state.formdata
        k['kdkota'] = itemValue
        this.setState({ 
            formdata:k
        })
    }
    }>
    <Picker.Item label="== PILIH ==" value="" />
        {
            this.state.kota.map((row)=>
                <Picker.Item label={row.nama} value={row.kode} />
            )
        }
        
</Picker>
 <Label>Alamat</Label>
 <Textarea style={styles.bg_abu2} value={this.state.formdata.alamat} onChangeText={(teks)=>this.changeHandler("alamat",teks)} name="alamat" required/>
 <Label>Tanggal Lahir</Label>
 <DatePicker style={styles.bg_abu2} value={this.state.formdata.tanggalLahir} onDateChange={(tgl)=>this.changeHandler("tanggalLahir",tgl)} required />
 </Form>
 <Button block transparent onPress={this.handlePostClick}>
 <Text>Done</Text>
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