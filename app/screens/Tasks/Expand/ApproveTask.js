import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Text, Button, Icon, Left, Right, Body,View, List, ListItem, H3 } from 'native-base';
import RightHeaderButtons from '../../../components/RightHeaderButtons.js';
import firebase from 'firebase';
import { Image } from 'react-native';
import * as Functions from '../../../utils/Functions.js';

export default class ApproveTask extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Approve Task',
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
                <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
                  <H3 note style={{fontWeight: "bold"}}>{Functions.Capitalize(this.item.val().type)}</H3>
                </Body>
              </Left>
            </CardItem>
            {this.item.val().hasOwnProperty('imageURL') && this.item.val().imageURL!=''?
              <CardItem>
                <Body >
                  <Text style={{color: '#87838B'}} >Image: </Text>
                    <Image source={{uri:this.item.val().imageURL}} style={{width: '100%', height: 200, flex: 1, marginTop: 6}}/>
                </Body>
                </CardItem>
             :
             <View></View>
            }
            <CardItem> 
              <Left>
              <Body>
                <Text style={{color: '#87838B'}} >Description: </Text>
                <Text style={{marginTop: 6}}>
                  {this.item.val().msg}
                </Text>
              </Body>
              </Left>
            </CardItem>

            <List style={{borderBottomWidth: 0, marginTop: 10}}>

              <ListItem icon noBorder style={{borderBottomWidth: 0}}>
                <Left>
                  <Icon active style={{color: '#87838B'}} name="md-checkmark-circle-outline" />
                </Left>
                <Body>
                <Text style={{color: Functions.TaskStatusColor(this.item.val().status)}}>Status: {Functions.Capitalize(this.item.val().status)}</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>

              <ListItem icon noBorder style={{borderBottomWidth: 0}}>
                <Left>
                  <Icon style={{color: '#87838B'}} active name="person" />
                </Left>
                <Body>
                  <Text style={{color: '#87838B'}}>Name: {this.item.val().username}</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>

              <ListItem icon noBorder style={{borderBottomWidth: 0}}>
                <Left>
                  <Icon style={{color: '#87838B'}} active name="calendar" />
                </Left>
                <Body>
                  <Text style={{color: '#87838B'}}>Date: {this.item.val().date}</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>

              <ListItem icon noBorder style={{borderBottomWidth: 0}}>
                <Left>
                  <Icon active style={{color: '#87838B'}} name="pin" />
                </Left>
                <Body>
                  <Text style={{color: '#87838B'}}>Location: {this.item.val().location}</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>

            </List>

            <CardItem>
              <Body>

            <Button full
                        rounded style={{ marginTop:10 }}
                        primary iconLeft onPress={()=>this.Confirm()}>
              <Icon name='checkbox' />
              <Text>Confirm</Text>
             </Button><Button full
                        rounded style={{ marginTop:10 }}
                        danger iconLeft onPress={()=>this.Cancel()}>
              <Icon name='checkbox' />
              <Text>Rerequest</Text>
             </Button>
             </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}