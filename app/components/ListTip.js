import React, {
  Component
} from 'react';
import {Icon, Text, ListItem,Left,Body,Right,Button, Card, CardItem} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';


class ListTip extends Component {
  render() {
    return (
      
      <CardItem header bordered>
        
                <Left>
                    <Ionicons name='md-bulb' size={responsiveFontSize(5)}/>
                  
                    
                    
                </Left>
                
                <Body >
                <Text>{this.props.tip.fetchedDataName}</Text>
                    <Text style={{marginTop: 20,}}>
                        {this.props.tip.fetchedDataDes}
                    </Text>
                </Body>
                
   
          
        {this.props.userRole == 'admin' ?
            <Right>
            <Icon name='md-trash' onPress={() => this.props.onDataDeletion()}/>
            </Right>
            :
            <Text></Text>
        }
        

      </CardItem>
    
    );
  }
}

export default ListTip;