import React, { Component } from "react";
import { 
  View,
  StyleSheet
} from "react-native";

//Initialize firebase
import * as firebase from 'firebase';

import {Ionicons} from '@expo/vector-icons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import { Container, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Button } from 'native-base';
import RightHeaderButtons from '../../components/RightHeaderButtons.js';

class Settings extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'SETTINGS',
    headerRight: (
        <RightHeaderButtons navigation={navigation}/>
    ),
  });

  constructor(props) {
    super(props)

    this.state = ({
        Notifications: true, //Notifications are muted by the user 
    })
    this.isNotificationsMute()
  }

  isNotificationsMute() {
    var user = firebase.database().ref("users/"+ firebase.auth().currentUser.uid).orderByKey();
    user.once("value")
        .then(function(snapshot) {
            if(snapshot.val().muteNotifications!="True"){
                this.setState({Notifications: true});
                //console.log(snapshot.val().muteNotifications)
            }else{
                this.setState({Notifications: false});
                //console.log(snapshot.val().muteNotifications)
            }
    }.bind(this));
  }

  muteNotifications = () => {}

  signOutUser = () => {
    //Remove users push token from database
    firebase.database().ref( 'users/'+ firebase.auth().currentUser.uid ).child('expoToken').remove()
    firebase.auth().signOut() //sign out user from firebase
  }

  toggleNotifications = () => {
    var mute = {}
    mute['/muteNotifications'] = 'True'  
    if(this.state.Notifications){    
      firebase.database().ref('users').child(firebase.auth().currentUser.uid).update(mute)
      this.setState({Notifications: false});
      console.log("muted")
    }else{
      firebase.database().ref('users/'+firebase.auth().currentUser.uid).child('muteNotifications').remove()
      this.setState({Notifications: true});
      console.log("Unmuted")
    }
  }


  render() {
    return (
      <Container>
        <Content>

          <ListItem thumbnail button onPress={() => this.props.navigation.navigate('MyProfile')}>
            <Left>
              <Ionicons style={{color: 'rgba(0,0,0,0.5)'}} name='ios-person' size={responsiveFontSize(4)}/>
            </Left>
            <Body>
              <Text>My Profile</Text>
              <Text note numberOfLines={1}>View your profile information.</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem thumbnail button onPress={() => this.props.navigation.navigate('ChangePassword')}>
            <Left>
              <Ionicons style={{color: 'rgba(0,0,0,0.5)'}} name='ios-lock' size={responsiveFontSize(4)}/>
            </Left>
            <Body>
              <Text>Change Password</Text>
              <Text note numberOfLines={1}>Change your account password.</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem thumbnail>
            <Left>
              <Ionicons style={{color: 'rgba(0,0,0,0.5)'}} name='ios-alert' size={responsiveFontSize(4)}/>
            </Left>
            <Body>
              <Text>My ICE Numbers</Text>
              <Text note numberOfLines={1}>Edit your in-case of emergency contact details.</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem thumbnail>
            <Left>
              <Ionicons style={{color: 'rgba(0,0,0,0.5)'}} name='md-notifications' size={responsiveFontSize(4)}/>
            </Left>
            <Body>
              <Text>Notifications</Text>
              <Text note numberOfLines={1}>Enable and disable push notifications.</Text>
            </Body>
            <Right>
              <Switch value={this.state.Notifications} onValueChange={() => this.toggleNotifications()}/>
            </Right>
          </ListItem>

          <ListItem thumbnail button onPress={() => this.props.navigation.navigate('StepCount')}>
            <Left>
              <Ionicons style={{color: 'rgba(0,0,0,0.5)'}} name='md-walk' size={responsiveFontSize(4)}/>
            </Left>
            <Body>
              <Text>Get My StepCount</Text>
              <Text note numberOfLines={1}>Get your step count from device.</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem thumbnail>
            <Left>
              <Ionicons style={{color: 'rgba(0,0,0,0.5)'}} name='md-bookmarks' size={responsiveFontSize(4)}/>
            </Left>
            <Body>
              <Text>Terms of Use</Text>
              <Text note numberOfLines={1}>Rules and regulations related to our app.</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem thumbnail button onPress={() => this.signOutUser('ChangePassword')}>
            <Left>
              <Ionicons style={{color: 'rgba(0,0,0,0.5)'}} name='ios-log-out' size={responsiveFontSize(4)}/>
            </Left>
            <Body>
              <Text>Sign Out</Text>
              <Text note numberOfLines={1}>Sign out from your account.</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

        </Content>
      </Container>
    );
  }
}
export default Settings;
