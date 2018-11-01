import React, { Component } from "react";
import { 
  View,
  StyleSheet
} from "react-native";

//Initialize firebase
import * as firebase from 'firebase';

import {Ionicons} from '@expo/vector-icons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import { Container, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Button, Label, Thumbnail, Item, Input, Card, CardItem, Form } from 'native-base';
import RightHeaderButtons from '../../components/RightHeaderButtons.js';

class MyProfile extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'My Profile',
    headerRight: (
        <RightHeaderButtons navigation={navigation}/>
    ),
  });


  render() {
    return (
      <Container>
        <Content>

            <View style={{flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                <Ionicons style={{color: 'rgba(0,0,0,0.5)'}} name='ios-contact' size={responsiveFontSize(30)}/>
            </View>

            <Card transparent>
                <CardItem>
                    <Body>
                        <Item >
                            <Label>Name</Label>
                            <Input 
                                value={firebase.auth().currentUser.displayName}
                                disabled
                            />
                        </Item>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body>
                        <Item >
                            <Label>Email</Label>
                            <Input 
                                value={firebase.auth().currentUser.email}
                                disabled
                            />
                        </Item>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body>
                        <Item >
                            <Label>Email Verified</Label>
                            <Ionicons style={{color: 'rgba(0,0,0,0.5)'}} name='md-checkbox-outline' size={30}/>
                            <Input 
                                disabled
                            />
                            
                        </Item>
                    </Body>
                </CardItem>
            </Card>

        </Content>
      </Container>
    );
  }
}
export default MyProfile;
