import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Root } from 'native-base';
import { Font, AppLoading } from "expo";
import Anchor from '../../components/Anchor';
import {Ionicons} from '@expo/vector-icons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import RightHeaderButtons from '../../components/RightHeaderButtons.js';
import Fire from './Fire';
import * as firebase from 'firebase';

export default class ChatMenu extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Chat Menu',
        headerRight: (
            <RightHeaderButtons navigation={navigation}/>
        ),
        
      });
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }


    userRole = "";
    department = "";
    chatNavigate = "";

    async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        
        /*Handle Security Issue which arrise when userRole has been changed*/
        await firebase.database().ref('users/'+firebase.auth().currentUser.uid).once('value', (snapshot) => {
            this.userRole = snapshot.val().role;
            this.department = snapshot.val().department;
             
              this.setState({fire_loaded:true});
              this.forceUpdate();
              //console.log(snapshot); Returns returned data of users
            });
        this.setState({ loading: false });
        //console.log(this.department); returns users department
        if(this.userRole != "superadmin"){ 
            this.props.navigation.navigate('Login');
        }


    }

    render() {
        if (this.state.loading) {
        return (
            <AppLoading />
        );
        }

    return (
      <Container>
        <Content>       
          <List>
            <ListItem thumbnail button={true} onPress={() => { this.props.navigation.navigate('ChatNoyonLanka')} }>
              <Left>
                <Ionicons name='ios-chatbubbles' style={{color: '#0b1c7a'}} size={responsiveFontSize(7)}/>
              </Left>
              <Body>
                <Text>Noyon Lanka (Pvt) Ltd</Text>
              </Body>
            </ListItem>
          </List>

          <List>
            <ListItem thumbnail button={true} onPress={() => { this.props.navigation.navigate('ChatMASmatrix')} }>
              <Left>
                <Ionicons name='ios-chatbubbles' style={{color: '#dc001b'}} size={responsiveFontSize(7)}/>
              </Left>
              <Body>
                <Text>MAS Fabrics - MATRIX</Text>
              </Body>
              
            </ListItem>
          </List>
          <List>
            <ListItem thumbnail button={true} onPress={() => { this.props.navigation.navigate('ChatTrischelFabric')} }>
              <Left>
                <Ionicons name='ios-chatbubbles' style={{color: '#66547f'}}  size={responsiveFontSize(7)}/>
              </Left>
              <Body>
                <Text>Trischel Fabric (Pvt) Ltd</Text>
              </Body>
              
            </ListItem>
          </List>
          <List>
            <ListItem thumbnail button={true} onPress={() => { this.props.navigation.navigate('ChatTextprintLanka')} }>
              <Left>
                <Ionicons name='ios-chatbubbles' style={{color: '#3ca49d'}} size={responsiveFontSize(7)}/>
              </Left>
              <Body>
                <Text>Textprint Lanka (Pvt) Ltd</Text>
              </Body>
              
            </ListItem>
          </List>
          <List>
            <ListItem thumbnail button={true} onPress={() => { this.props.navigation.navigate('ChatMASFabrics')} }>
              <Left>
                <Ionicons name='ios-chatbubbles' style={{color: '#dc001b'}} size={responsiveFontSize(7)}/>
              </Left>
              <Body>
                <Text>MAS Fabrics (Pvt) Ltd</Text>
              </Body>
              
            </ListItem>
          </List>
        </Content>
      </Container>
      
    );
  }
}