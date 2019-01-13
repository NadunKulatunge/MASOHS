import React, {Component} from 'react';
import { Alert } from 'react-native';
import {Container, Content, Form, Item, Input, Card, CardItem, Body, Button, Text, View, Spinner} from 'native-base';
import RightHeaderButtons from '../../components/RightHeaderButtons.js';

//Initialize firebase
import * as firebase from 'firebase';

export default class changePassword extends Component{
  static navigationOptions = ({navigation}) => ({
    title: 'Change Password',
    headerRight: (
        <RightHeaderButtons navigation={navigation}/>
    ),
    
  });

  constructor(props) {
    super(props)

    this.state = ({
        currentPassword: '',
        newPassword: '',
        reTypePassword: '',
        changePasswordLoading: false,
    })
    
  }

    changePassword = (currentPassword, newPassword, reTypePassword) => {
        
        this.setState({changePasswordLoading: true});

        if(newPassword != reTypePassword ){
            Alert.alert('Error', 'Passwords arent matching!');
            this.setState({changePasswordLoading: false});
        }else{
             //Validate Current Users Password 
            firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(
                firebase.auth.EmailAuthProvider.credential(
                    firebase.auth().currentUser.email, 
                    currentPassword
                )
            ).then(function() {
                    // User re-authenticated.
                    // So now Change users password
                    firebase.auth().currentUser.updatePassword(newPassword).then(function() {
                        // User password updated.
                        Alert.alert('Success', 'Your password has been changed.');
                        this.setState({changePasswordLoading: false});
                        this.props.navigation.goBack(null);
                    }.bind(this)).catch(function(error) {
                        // An error happened when changing to new password.
                        Alert.alert('Error', error.message);
                        this.setState({changePasswordLoading: false});
                    }.bind(this));
            }.bind(this)).catch(function(error) {
                    // An error happened Current Password Problem
                    Alert.alert('Error', error.message);
                    this.setState({changePasswordLoading: false});
            }.bind(this));
        }
    }

  render(){
    return(
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Item>
                    <Input 
                        placeholder="Current Password" 
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={ (currentPassword) => this.setState({currentPassword}) }
                        value={this.state.currentPassword}
                    />
                </Item>
                <Item>
                    <Input 
                        placeholder="New Password" 
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={ (newPassword) => this.setState({newPassword}) }
                        value={this.state.newPassword}
                    />
                </Item>
                <Item last>
                    <Input 
                        placeholder="Retype Password" 
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={ (reTypePassword) => this.setState({reTypePassword}) }
                        value={this.state.reTypePassword}
                    />
                </Item>
                { this.state.changePasswordLoading === true ? 
                        <Button style={{ marginTop:40 }}
                            full
                            rounded
                            primary>
                            <View><Spinner color='white' /></View>
                            <Text style={{ color:'white' }}>Submit</Text>
                        </Button>
                        :
                        <Button style={{ marginTop:40 }}
                            full
                            rounded
                            primary
                            onPress = { () => this.changePassword(this.state.currentPassword, this.state.newPassword, this.state.reTypePassword)}>
                            <Text style={{ color:'white' }}>Submit</Text>
                        </Button>
                    }
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}