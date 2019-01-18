import React, {
    Component
  } from 'react';
  import {Icon, Text, ListItem,Left,Body,Right,Thumbnail} from 'native-base';
  import {Ionicons} from '@expo/vector-icons';
  import Anchor from './Anchor';

  import { responsiveFontSize } from 'react-native-responsive-dimensions';
  
  
  class ListEmergency extends Component {
    render() {
      return (
        <ListItem thumbnail>
          <Left>
            <Thumbnail square source={require('../assets/emergency-exit-98585_640.png')} />
          </Left>
          <Body>
            <Text>{this.props.emergency.fetchedDataName}</Text>
            <Text note numberOfLines={1}>{this.props.emergency.fetchedDataDes}</Text>
          </Body>
          <Right>
                <Anchor href={this.props.emergency.fetchedDataLink}><Ionicons name='md-globe' size={responsiveFontSize(3)}/></Anchor>
          </Right>
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
  
  export default ListEmergency;