import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,

} from "react-native";
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';

//Initialize firebase
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBw7Nr1erf87fArWkv4k3kgRRzRBEkz3RE",
  authDomain: "massohsapp.firebaseapp.com",
  databaseURL: "https://massohsapp.firebaseio.com",
  projectId: "massohsapp",
  storageBucket: "massohsapp.appspot.com",
};

firebase.initializeApp(firebaseConfig);


class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)

        this.state = ({
            email: '',
            password: ''
        })

        firebase.auth().onAuthStateChanged(user => {
            //user account available and verified user
            if(user && user.emailVerified){ this.props.navigation.navigate('Home') };

        })
        this.signUpUser = this.signUpUser.bind(this);
        
    }

    signUpUser = (email, password) => {
       
        //Validations
        if(this.state.password.length < 6){
            alert("Password should be at least 6 characters.");
            return;
        }
        //Signup Firebase
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
            //Sending email verifications
            var user = firebase.auth().currentUser;
            user.sendEmailVerification().then(function() {
                alert("Email verification sent. Please verify your email address.");
            }).catch(function(error) { 
                alert("Error sending email verification.");
            });
            
        }).catch(function(error) {
            switch(error.code){

                case "EMAIL_TAKEN":
                alert("The new user account cannot be created because the email is already in use.");
                break;
    
                case "INVALID_EMAIL":
                alert("The specified email is not a valid email.");
                break;
    
                default:
                alert("Error creating user.");
            }
        });
        
    }

    loginUser = (email, password) => {
        //Login Firebase
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
            //console.log(user)
            if(user && user.emailVerified){ 
                this.props.navigation.navigate('Home');
            }
            else if(!user.emailVerified){ 
                alert('Please verify your email account!');
            }
            
        }).catch(function(error) {
            alert(error.message);
        });
    }

    render() {
        return (
            <Container style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={ (email) => this.setState({email}) }
                            value={this.state.email}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={ (password) => this.setState({password}) }
                            value={this.state.password}
                        />
                    </Item>

                    <Button style={{ marginTop:10 }}
                        full
                        rounded
                        success
                        onPress = { () => this.loginUser(this.state.email, this.state.password)}>
                        <Text style={{ color:'white' }}>Login</Text>
                    </Button>
                    <Button style={{ marginTop:10 }}
                        full
                        rounded
                        primary
                        onPress = { () => this.signUpUser(this.state.email, this.state.password)}>
                        <Text style={{ color:'white' }}>Sign Up</Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    }
});