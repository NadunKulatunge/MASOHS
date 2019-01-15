import React, { Component } from "react";
import { 
    View,
    StyleSheet,
    Image
} from "react-native";

import { Container,Fab, Header,Footer, Title, Content, Card, CardItem, Form, Input, Item,  Thumbnail, Text, Button, Icon, Left, Body ,H1} from 'native-base';
import { Font, AppLoading } from "expo";
import ListItem from '../../../components/ListItem'
import {FormStyle} from '../../../styles/styles'
import {Ionicons} from '@expo/vector-icons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import RightHeaderButtons from '../../../components/RightHeaderButtons';
import firebase from 'firebase';

class AddContact extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Add Contact',
        headerRight: (
            <RightHeaderButtons navigation={navigation}/>
        ),
    });
    constructor(props) {
        super(props)
        this.fetchedDatasRef = firebase.database().ref('contacts');
        this.state = ({
            fetchedDataName: '',
            fetchedDataNum: '',
            loading: true
        })

    }
    async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ 
            loading: false,
          });
    }
    onChanged(text){ 
        var newText = ''; 
        var numbers = '0123456789'; 
        if(text.length < 1){ 
            this.setState({ fetchedDataNum: '' });
        } 
        for (var i=0; i < text.length; i++) { 
            if(numbers.indexOf(text[i]) > -1 ) { 
                newText = newText + text[i]; 
            } 
            else {
                // your call back function
                alert("Please enter numbers only");
            }
            this.setState({ fetchedDataNum: newText }); 
        } 
    }
    
    render() {
        if (this.state.loading) {
            return (
                <AppLoading />
            );
        }
        return (
            <Container style={styles1.container}>
                <H1 style={{textAlign: 'center'}}>Add Contact</H1>
                <Form>
                    <Item >
                        <Input
                            placeholder="Contact Name"
                            autoCorrect={false}
                            autoCapitalize="words"
                            onChangeText={ (fetchedDataName) => this.setState({fetchedDataName}) }
                            value={this.state.fetchedDataName}
                        />
                    </Item>
                    <Item >
                        <Input
                            placeholder="Contact Number"
                            autoCorrect={false}
                            keyboardType = 'numeric'
                            onChangeText={(text)=> this.onChanged(text)}
                            value={this.state.fetchedDataNum}
                            maxLength={10}
                            
                        />
                    </Item>
                    
                    <Button style={{ marginTop:40 }}
                            full
                            rounded
                            success
                            onPress={() => this._addData()}>
                            <Text style={{ color:'white' }}>Add Contact</Text>
                    </Button>
                    <Button style={{ marginTop:10 }}
                        full
                        rounded
                        primary
                        onPress = { () => this.props.navigation.navigate('Information')}>
                        <Text style={{ color:'white' }}>Go To Information</Text>
                    </Button>
                 
                </Form>
            </Container>
        );
    }
    _addData() {
        if(this.state.fetchedDataName == '' ){
            alert("Contact name field cannot be empty!");
            return;
        }
        else if(this.state.contactNum == '' ){
            alert("Contact number field cannot be empty!");
            return;
        }
        this.fetchedDatasRef.push({ contactName: this.state.fetchedDataName, contactNum: this.state.fetchedDataNum});
        this.setState({fetchedDataName: ""});
        this.setState({fetchedDataNum: ""});
        alert("Contact added successfully!");
    }

}
export default AddContact;
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    }
});