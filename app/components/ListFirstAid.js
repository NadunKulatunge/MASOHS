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
            <Thumbnail square source={{ uri: src="data:image/png;base64,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"}}/>
          </Left>
          <Body>
            <Text>{this.props.firstAid.fetchedDataName}</Text>
            <Text note numberOfLines={1}>{this.props.firstAid.fetchedDataDes}</Text>
          </Body>
          <Right>
                <Anchor href={this.props.firstAid.fetchedDataLink}><Ionicons style={{color: '#4286F4'}} name='md-globe' size={responsiveFontSize(3)}/></Anchor>
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