import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image

} from "react-native";
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, Spinner } from 'native-base';

//Initialize firebase
import * as firebase from 'firebase';
import Ionicons from "@expo/vector-icons/Ionicons";

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
            password: '',
            signinLoading: false,
            forgotpasswordLoading: false
        })

        firebase.auth().onAuthStateChanged(user => {
            //user account available and verified user
            if(user && user.emailVerified){ this.props.navigation.navigate('Home') };

        })
        //this.signUpUser = this.signUpUser.bind(this);
        
    }

    loginUser = (email, password) => {
        //Login Firebase
        this.setState({signinLoading: true});
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
            //console.log(user)
            if(user && user.emailVerified){ 
                this.props.navigation.navigate('Home');
            }else if(!firebase.auth().currentUser.emailVerified){ 
                alert('Please verify your email account!');
            }
            this.setState({signinLoading: false});
        }.bind(this)).catch(function(error) {
            alert(error.message);
            this.setState({signinLoading: false});
        }.bind(this));
    }

    forgotPassword = (email) => {
        if( this.state.email == '' ){
            alert("Please enter your email address first.");
            return;
        }
        this.setState({forgotpasswordLoading: true});
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(email).then(function() {
            alert("Password reset email sent");
            this.setState({forgotpasswordLoading: false});
        }.bind(this)).catch(function(error) {
            alert(error.message);
            this.setState({forgotpasswordLoading: false});
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
                    
                    { this.state.signinLoading === true ? 
                        <Button style={{ marginTop:40 }}
                            full
                            rounded
                            success>
                            <View><Spinner color='white' /></View>
                            <Text style={{ color:'white' }}>Login</Text>
                        </Button>
                        :
                        <Button style={{ marginTop:40 }}
                            full
                            rounded
                            success
                            onPress = { () => this.loginUser(this.state.email, this.state.password)}>
                            <Text style={{ color:'white' }}>Login</Text>
                        </Button>
                    }
                    <Button style={{ marginTop:10 }}
                        full
                        rounded
                        primary
                        onPress = { () => this.props.navigation.navigate('SignUp')}>
                        <Text style={{ color:'white' }}>Sign Up</Text>
                    </Button>

                    { this.state.forgotpasswordLoading === true ? 
                        <Button transparent full primary>
                            <View><Spinner color='black' /></View>
                            <Text>Forgot Password ?</Text>
                        </Button>
                    :
                        <Button transparent full primary 
                            onPress = { () => this.forgotPassword(this.state.email)}>
                            <Text>Forgot Password ?</Text>
                        </Button>
                    }
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