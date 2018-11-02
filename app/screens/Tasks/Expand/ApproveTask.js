import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Text, Button, Icon, Left, Right, Body,View } from 'native-base';
import RightHeaderButtons from '../../../components/RightHeaderButtons.js';
import firebase from 'firebase';
import { Image } from 'react-native';


export default class ApproveTask extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'View Task',
    headerRight: (
        <RightHeaderButtons navigation={navigation}/>
    ),
  });

  item = this.props.navigation.getParam('item', 'item not recieved');
  type=this.props.navigation.getParam('type','');
  
  Confirm(){
    firebase.database().ref(this.item.val().type+'/'+this.item.key).update({"status":'completed'});
    this.props.navigation.navigate('Tasks');
  }; 
  
  Cancel(){
    firebase.database().ref(this.item.val().type+'/'+this.item.key).update({"status":'raised'});
    this.props.navigation.navigate('Tasks');
  };
  
  render() {
    
    return (
      <Container>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem header bordered>
              <Left>
                <Body>
                  <Text note style={{color: 'red'}}>{this.item.val().type}</Text>
                </Body>
              </Left>
            </CardItem>
            {this.item.val().hasOwnProperty('imageURL')?
              <CardItem>
                <Body >
                    <Image source={{uri:this.item.val().imageURL}} style={{width: '100%', height: 200, flex: 1}}/>
                </Body>
                </CardItem>
             :
             <View></View>
            }
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
                </Button>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="calendar" />
                  <Text>{this.item.val().date}</Text>
                </Button>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="pin" />
                  <Text>{this.item.val().location}</Text>
                </Button>
              </Left>
            </CardItem>
            <CardItem>
            <Button success iconLeft onPress={()=>this.Confirm()}>
              <Icon name='checkbox' />
              <Text>Confirm</Text>
             </Button><Button danger iconLeft onPress={()=>this.Cancel()}>
              <Icon name='checkbox' />
              <Text>Rerequest</Text>
             </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}