import React,{Component} from 'react'
import { 
    Container, Header, Content, Card, 
    CardItem, Thumbnail, Text, Button, 
    Icon, Left, Body, Right } from 'native-base';
import {Image} from 'react-native'

export default class Home extends Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <Container>
                <Content style={{flex:1,flexDirection:"row"}}>
                    <Content style={{flex:1,flexDirection:"column"}}>
                        <Card key="1">
                            <CardItem cardBody >
                                <Image source={require('../../img/coll.jpg')} style= {{height: 200, width: null, flex: 1}}/>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>Mahasiswa</Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card key="2">
                            <CardItem cardBody >
                                <Image source={require('../../img/coll.jpg')} style= {{height: 200, width: null, flex: 1}}/>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>KRS</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                    <Content style={{flex:1,flexDirection:"column"}}>
                        <Card key="3">
                            <CardItem cardBody >
                                <Image source={require('../../img/coll.jpg')} style= {{height: 200, width: null, flex: 1}}/>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>Jurusan</Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card key="4">
                            <CardItem cardBody >
                                <Image source={require('../../img/coll.jpg')} style= {{height: 200, width: null, flex: 1}}/>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>Matakuliah</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Content>
            </Container>
        )
    }

}