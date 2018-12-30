import React, { Component } from 'react';
import { Container, Header, Content, List, } from 'native-base';
import {FlatList, Alert} from "react-native"

export default class ListItems extends Component {
 render() {
    const {
        renderFooter,
        renderList
    } = this.props;
    return (
        <List style={{marginTop:10}}>
            <FlatList
                data={this.props.data}
                keyExtractor={(item, index) => item.id.toString()}
                ListFooterComponent={renderFooter()}
                renderItem={({item, index}) => renderList(item,index)}
            />
        </List>
    );
    }
}