import React, {Component} from 'react';
import {
    Platform, StyleSheet, View, Picker
} from 'react-native';
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

const instructions = Platform.select({
 ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
 android:
 'Double tap R on your keyboard to reload,\n' +
 'Shake or press menu button for dev menu',
});

export default class Editscreen extends Component {
    constructor(props){
        super(props)
        
        this.state={
            mahasiswa: {
                nama: '',
                nim: '',
                jurusan: '',
                provinsi: '',
                kota: '',
                alamat: '',
                tanggalLahir: ''
            },

            jurusan: [],
            kota: [],
            provinsi: []  
        }
    }

    changeHandler(name,value){
        let tmp=this.state.mahasiswa
        tmp[name]=value
        this.setState({
            mahasiswa:tmp
        })
     }


componentDidMount(){
    this.setState({
        mahasiswa: this.props.navigation.state.params.item
    });
    this.getListData();

    console.warn("Mahasiswa : "+JSON.stringify(this.props.navigation.state.params.item))
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

    axios({ method:'PUT',url:URLAPI.BASE_URL+URLAPI.ENDPOINTS.MAHASISWA, 
            headers:{//apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA
                'Content-Type':'application/json',
                'Accepted-Language':'application/json'
            },
            data: this.state.mahasiswa
    })
    .then(res => {
        alert('Berhasil memasukkan data!')
        this.kosongkan();
    })
    .catch(err => {
        alert("Terdapat kesalahan, "+err.message)
        console.log("Error : "+JSON.stringify(err))
        console.log("Mahasiswa : "+JSON.stringify(this.state.mahasiswa))
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
 <Input style={styles.bg_abu2} value={this.state.mahasiswa.nama} onChangeText={(teks)=>this.changeHandler("nama",teks)} name="nama" required/>

 <Label>NIM</Label>
 <Input style={styles.bg_abu2} value={this.state.mahasiswa.nim} onChangeText={(teks)=>this.changeHandler("nim",teks)} name="nim" required/>

 <Label>Jurusan</Label>
 <Picker
    selectedValue={this.state.mahasiswa.kdjur}
    style={{ height: 50, width: '100%' }+styles.bg_abu2}
    onValueChange={(itemValue, itemIndex) => {
        let j = this.state.mahasiswa
        j['kdjur'] = itemValue
        this.setState({ 
            
            mahasiswa:j
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
    selectedValue={this.state.mahasiswa.kdprov}
    style={{ height: 50, width: '100%' }+styles.bg_abu2}
    onValueChange={(itemValue, itemIndex) => {
        let p = this.state.mahasiswa
        p['kdprov'] = itemValue
        this.setState({ 
            mahasiswa:p
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
    selectedValue={this.state.mahasiswa.kdkota}
    style={{ height: 50, width: '100%' }+styles.bg_abu2}
    onValueChange={(itemValue, itemIndex) => {
        let k = this.state.mahasiswa
        k['kdkota'] = itemValue
        this.setState({ 
            mahasiswa:k
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
 <Textarea style={styles.bg_abu2} value={this.state.mahasiswa.alamat} onChangeText={(teks)=>this.changeHandler("alamat",teks)} name="alamat" required/>
 <Label>Tanggal Lahir</Label>
 <DatePicker style={styles.bg_abu2} value={this.state.mahasiswa.tanggalLahir} onDateChange={(tgl)=>this.changeHandler("tanggalLahir",tgl)} required />
 </Form>
 <Button block backgroundColor="orange" onPress={this.handlePostClick}>
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