import React, {
    Component
  } from 'react';
  import {CardItem,Icon, Text, ListItem,Left,Body,Right,Button} from 'native-base';
  import {Ionicons} from '@expo/vector-icons';
  import Communications from 'react-native-communications';

  import { responsiveFontSize } from 'react-native-responsive-dimensions';
  
  
  class ListContact extends Component {
    render() {
      return (
        <ListItem thumbnail>
          {/* <Left>
            <Ionicons name='md-call' size={responsiveFontSize(5)}/>
          </Left> */}
          <Body>
            
            <Button transparent onPress={() => Communications.phonecall(this.props.contact.fetchedDataNum, true)}>
                <Text><Ionicons name='ios-call' size={responsiveFontSize(4)} onPress={() => Communications.phonecall(this.props.contact.fetchedDataNum, true)}/></Text>
                <Text>{this.props.contact.fetchedDataName}</Text>
            </Button>
            <Text note numberOfLines={1}>{this.props.contact.fetchedDataNum}</Text>
          </Body>
            
          {this.props.userRole == 'admin' ?
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