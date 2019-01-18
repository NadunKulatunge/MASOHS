import React, {
    Component
  } from 'react';
  import {Icon, Text, ListItem,Left,Body,Right,Button, Thumbnail} from 'native-base';
  import {Ionicons} from '@expo/vector-icons';
  import Communications from 'react-native-communications';

  import { responsiveFontSize } from 'react-native-responsive-dimensions';
  
  
  class ListContact extends Component {
    render() {
      return (
        <ListItem thumbnail>
          <Left>
          <Thumbnail square source={{ uri: 'https://png.icons8.com/metro/50/000000/fire-element.png' }} />
          </Left>
          <Body>
          <Text>{this.props.contact.fetchedDataName}</Text>
          <Text note numberOfLines={1}>{this.props.contact.fetchedDataNum}</Text>
             </Body>
              <Right>
                <Button transparent onPress={() => Communications.phonecall(this.props.contact.fetchedDataNum, true)}>
                  <Text><Ionicons name='ios-call' size={responsiveFontSize(3)}/></Text>
                </Button>
              </Right>
          {/* <Body>
            
            <Button transparent onPress={() => Communications.phonecall(this.props.contact.fetchedDataNum, true)}>
                <Text><Ionicons name='ios-call' size={responsiveFontSize(4)} onPress={() => Communications.phonecall(this.props.contact.fetchedDataNum, true)}/></Text>
                <Text>{this.props.contact.fetchedDataName}</Text>
            </Button>
            <Text note numberOfLines={1}>{this.props.contact.fetchedDataNum}</Text>
          </Body> */}
            
          {this.props.userRole == 'superadmin' ?
              <Right>
              <Icon name='md-trash' onPress={() => this.props.onDataDeletion()}/>
              </Right>
              :
              <Right></Right>
          }
          

        </ListItem>
      
      );
    }
  }
  
  export default ListContact;