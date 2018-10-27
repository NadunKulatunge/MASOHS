import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Text, Button, Icon, Left, Right, Body } from 'native-base';
import RightHeaderButtons from '../../../components/RightHeaderButtons.js';


export default class ViewTask extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'View Task',
    headerRight: (
        <RightHeaderButtons navigation={navigation}/>
    ),
  });

  item = this.props.navigation.getParam('item', 'item not recieved');
  
  
  render() {
    
    return (
      <Container>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Body>
                  <Text note style={{color: 'red'}}>{this.item.val().date}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
              <Body>
                <Text>
                  {this.item.val().msg}
                </Text>
              </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="person" />
                  <Text>{this.item.val().username}</Text>
                  <Icon name="pin" />
                  <Text>{this.item.val().location}</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}