import React, {
  Component
} from 'react';
import {Icon, Text, ListItem,Left,Body,Right,Button, Card, CardItem, Container, Content, Image} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { 
  View,
} from "react-native";

class ListTip extends Component {
  render() {
    return (
      <Card style={{flex: 0}}>
      <CardItem header bordered>
      <Left>
          <Ionicons name='md-bulb' size={responsiveFontSize(5)}/>
          <Body>
          <Text>{this.props.tip.fetchedDataName}</Text>
          </Body>
      </Left>
      </CardItem>
      <CardItem>
      <Body >
          <Image source={{uri: 'https://image.freepik.com/free-vector/happy-kids-back-to-school_53876-40283.jpg'}} style={{width: '100%', height: 200, flex: 1}}/>
          <Text style={{marginTop: 20}}>
          {this.props.tip.fetchedDataDes}
          </Text>
      </Body>
      </CardItem>
      <CardItem footer bordered>
      <Left>
          <Button transparent textStyle={{color: '#87838B'}}>
          <Ionicons color='#87838B' name='ios-image-outline' size={responsiveFontSize(3)}/>
          <Text style={{color:'#87838B'}}>Created by Rawpixel.com - Freepik.com</Text>
          </Button>
          {this.props.userRole == 'superadmin' ?
            <Icon name='md-trash' onPress={() => this.props.onDataDeletion()}/>
            :
            <Text></Text>
          }
      </Left>
      </CardItem>
      </Card>
    );
  }
}

export default ListTip;