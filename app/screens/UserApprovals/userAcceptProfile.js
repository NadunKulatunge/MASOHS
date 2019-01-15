import React, { Component } from "react";
import { 
  View,
  StyleSheet,
  Alert
} from "react-native";

//Initialize firebase
import * as firebase from 'firebase';

import {Ionicons} from '@expo/vector-icons';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

import { Container, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Button, Label, Thumbnail, Item, Input, Card, CardItem, Form, Picker } from 'native-base';
import RightHeaderButtons from '../../components/RightHeaderButtons.js';

import * as FirebasePushNotifications from "../../utils/FirebasePushNotifications";


class MyProfile extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'My Profile',
    headerRight: (
        <RightHeaderButtons navigation={navigation}/>
    ),
  });

  item = this.props.navigation.getParam('item', 'item not recieved');

  constructor(props) {
    super(props);
    this.state = {
      roleSelected: this.item.role,
      departmentSelected: this.item.department
    };
  }

  onRoleValueChange(value) {
    this.setState({
      roleSelected: value
    });
  }
  onDepartmentValueChange(value){
    this.setState({
        departmentSelected: value
      });
  }

  ApproveUser(){
    firebase.database().ref('users').orderByChild('email').equalTo(this.item.email).once('value', function (snapshot) {
        snapshot.forEach(function(child) {
            child.ref.update({notApproved: null});
            FirebasePushNotifications.funcSendPushNotificationToUserID(firebase.auth().currentUser , child.key , 'Administration' , 'Your Account has been Approved. You can now Login to use the App', navigateTo="Settings");
        }.bind(this));
    }.bind(this));
    Alert.alert("Success", "User Approved");
    this.props.navigation.navigate('Settings');

  }; 
  Delete(){
    firebase.database().ref('users').orderByChild('email').equalTo(this.item.email).once('value', function (snapshot) {
        snapshot.forEach(function(child) {
            child.ref.remove();
        }.bind(this));
    }.bind(this));
    Alert.alert("Success", "User Deleted");
    this.props.navigation.navigate('Settings');
  }

  DeleteConfirm(){
    Alert.alert(
        'Confirmation',
        'Are you sure you want to delete this user?',
        [
            {text: 'Cancel', onPress: () => console.log('Cancel') , style: 'cancel'},
            {text: 'Delete User', onPress: () => this.Delete()},
        ],
        { cancelable: false }
      )


}; 

  render() {
    return (
      <Container>
        <Content>

            <Card transparent>
                <CardItem>
                    <Body>
                        <Item >
                            <Label>Role</Label>
                            <Picker
                                iosHeader = "Select a Role"
                                placeholder = "Select a Role"
                                note
                                mode="dropdown"
                                style={{ width: responsiveWidth(80) }}
                                selectedValue={this.state.roleSelected}
                                onValueChange={this.onRoleValueChange.bind(this)}
                                >
                                
                                <Picker.Item label="User" value="user" />
                                <Picker.Item label="Admin" value="admin" />
                                <Picker.Item label="SuperAdmin" value="superadmin" />
                            </Picker>
                            
                        </Item>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body>
                        <Item >
                            <Label>Email</Label>
                            <Input 
                                value={this.item.email}
                                disabled
                            />
                        </Item>
                    </Body>
                </CardItem>

                <CardItem>
                    <Body>
                        <Item >
                            <Label>Name</Label>
                            <Input 
                                value={this.item.displayName}
                                disabled
                            />
                        </Item>
                    </Body>
                </CardItem>
                
                <CardItem>
                    <Body>
                        <Item >
                            <Label>Department</Label>
                            <Picker
                                iosHeader = "Select a Department"
                                placeholder = "Select a Department"
                                note
                                mode="dropdown"
                                style={{ width: responsiveWidth(65) }}
                                selectedValue={this.state.departmentSelected}
                                onValueChange={this.onDepartmentValueChange.bind(this)}
                                >
                                <Picker.Item label="Noyon Lanka (Pvt) Ltd" value="Noyon Lanka (Pvt) Ltd" />
                                <Picker.Item label="MAS Fabrics - MATRIX" value="MAS Fabrics - MATRIX" />
                                <Picker.Item label="Trischel Fabric (Pvt) Ltd" value="Trischel Fabric (Pvt) Ltd" />
                                <Picker.Item label="Textprint Lanka (Pvt) Ltd" value="Textprint Lanka (Pvt) Ltd" />
                                <Picker.Item label="MAS Fabrics (Pvt) Ltd" value="MAS Fabrics (Pvt) Ltd" />
                                
                            </Picker>
                            
                        </Item>
                    </Body>
                </CardItem>
                
                <Button full
                        rounded style={{ marginTop:10 }}
                        primary  onPress={()=>this.ApproveUser()}>
                    <Text>Approve</Text>
                </Button>
                <Button full
                        rounded style={{ marginTop:10 }}
                        danger  onPress={()=>this.DeleteConfirm()}>
                    <Text>Delete</Text>
                </Button>

            </Card>

        </Content>
      </Container>
    );
  }
}
export default MyProfile;
