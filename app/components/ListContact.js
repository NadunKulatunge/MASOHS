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
          <Thumbnail square source={{ uri: src="data:image/png;base64,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" }} />
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