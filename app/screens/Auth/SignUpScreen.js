import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { Container, Content, Header, Form, Input, Item, Button, Label, CheckBox, Body, Spinner, H1 } from 'native-base';
import { BlurView } from 'expo';

//Initialize firebase
import * as firebase from 'firebase';

class SignUp extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)

        this.state = ({
            displayName: '',
            email: '',
            password1: '',
            password2: '',
            iAccept: false,
            signupLoading: false
        })

        firebase.auth().onAuthStateChanged(user => {
            //user account available and verified user
            if(user && user.emailVerified){ this.props.navigation.navigate('Home') };

        })
        
    }

    signUpUser = (email, password, displayName) => {
        

        //Validations
        if( this.state.displayName.length < 3 || this.state.displayName.length > 20 ) {
            alert("Display name should have 3-20 characters.");
            return;
        }else if( this.state.email == '' ){
            alert("Please insert an email address.");
            return;
        }else if ( this.state.email.split("@")[1]!="cse.mrt.ac.lk" ){
            alert("Please provide your company email address.");
            return;
        }else if( this.state.password1.length < 6 || this.state.password2.length < 6 ){
            alert("Password should have at least 6 characters.");
            return;
        }else if( this.state.password1 != this.state.password2 ){
            alert("Passwords do not match.");
            return;
        }
        else if( this.state.iAccept === false ){
            alert("Please accept our privacy policy.");
            return;
        }
        //Signup Firebase
        this.setState({signupLoading: true});
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
            //Sending email verifications
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: displayName,
            }).then(function() {
                user.sendEmailVerification().then(function() {
                    alert("Email verification sent. Please verify your email address.");
                    firebase.auth().signOut()
                }).catch(function(error) { 
                    alert("Error sending email verification.");
                });
            }).catch(function(error) {
                alert("Display name error");
            });
            this.setState({signupLoading: false});
            
        }.bind(this)).catch(function(error) {
            switch(error.code){

                case "auth/email-already-in-use":
                alert("Email address is already in use.");
                break;
    
                case "auth/invalid-email":
                alert("The specified email is not a valid email.");
                break;

                case "auth/weak-password":
                alert("The specified password is not a strong enough.");
                break;
    
                default:
                alert(error.message);
            }
            this.setState({signupLoading: false});
        }.bind(this));
        
    }

    render() {
        return (
            <Container style={styles.container}>
            <Image
        style={{
          backgroundColor: '#fff',
          flex: 1,
          position: 'absolute',
          width: '110%',
          height: '110%',
          justifyContent: 'center',
        }}

        source={require('../../assets/LoginBackground.jpg')}
      />
                <H1 style={{textAlign: 'center'}}>Sign Up</H1>
                <Form>
                    <Item floatingLabel>
                        <Label>Display Name</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="words"
                            onChangeText={ (displayName) => this.setState({displayName}) }
                            value={this.state.displayName}
                        />
                    </Item>
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
                            onChangeText={ (password1) => this.setState({password1}) }
                            value={this.state.password1}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Retype Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={ (password2) => this.setState({password2}) }
                            value={this.state.password2}
                        />
                    </Item>
                    <Item style={{borderColor: 'transparent', paddingVertical:20,}}onPress={() => this.setState({ iAccept: !this.state.iAccept })}>
                        <CheckBox checked={this.state.iAccept} onPress={() => this.setState({ iAccept: !this.state.iAccept })}/>
                        <Body style={{paddingLeft:20}}>
                        <Text>I have read and agree to the Terms and Conditions and Privacy Policy</Text>
                        </Body>
                    </Item>

                    
                    { this.state.signupLoading === true ? 
                        <Button style={{ marginTop:10 }}
                            full
                            rounded
                            primary>
                            <View><Spinner color='white' /></View>
                            <Text style={{ color:'white' }}>Sign Up</Text>
                        </Button>        
                            :
                        <Button style={{ marginTop:10 }}
                            full
                            rounded
                            primary
                            onPress = { () => this.signUpUser(this.state.email, this.state.password1, this.state.displayName)}>
                            <Text style={{ color:'white' }}>Sign Up</Text>
                        </Button> 
                    }

                    <Button style={{ marginTop:10 }}
                        full
                        rounded
                        success
                        onPress = { () => this.props.navigation.navigate('Login')}>
                        <Text style={{ color:'white' }}>Login</Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}
export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    }
});