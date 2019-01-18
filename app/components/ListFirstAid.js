import React, {
    Component
  } from 'react';
  import {Icon, Text, ListItem,Left,Body,Right,Thumbnail} from 'native-base';
  import {Ionicons} from '@expo/vector-icons';
  import Anchor from './Anchor';

  import { responsiveFontSize } from 'react-native-responsive-dimensions';
  
  
  class ListFirstAid extends Component {
    render() {
      return (
        <ListItem thumbnail>
          <Left>
            <Thumbnail square source={require('../assets/first-aid-1040283_640.png')} />
          </Left>
          <Body>
            <Text>{this.props.firstAid.fetchedDataName}</Text>
            <Text note numberOfLines={1}>{this.props.firstAid.fetchedDataDes}</Text>
          </Body>
          <Right>
                <Anchor href={this.props.firstAid.fetchedDataLink}><Ionicons name='md-globe' size={responsiveFontSize(3)}/></Anchor>
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
  
  export default ListFirstAid;