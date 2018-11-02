import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Root } from 'native-base';
import { Font, AppLoading } from "expo";
import Communications from 'react-native-communications';
import {Ionicons} from '@expo/vector-icons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
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
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://png.icons8.com/ios/40/000000/policeman-male.png' }} />
              </Left>
              <Body>
                <Text>Police Hotline</Text>
                <Text note numberOfLines={1}>119</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => Communications.phonecall('119', true)}>
                  <Text><Ionicons name='ios-call' size={responsiveFontSize(3)}/></Text>
                </Button>
              </Right>
           
            </ListItem>
          </List>
          <List>
            <ListItem thumbnail>
            <Left>
            <Thumbnail square source={{ uri: 'https://png.icons8.com/metro/50/000000/fire-element.png' }} />
              </Left>
              <Body>
                <Text>Fire Department</Text>
                <Text note numberOfLines={1}>110</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => Communications.phonecall('110', true)}>
                  <Text><Ionicons name='ios-call' size={responsiveFontSize(3)}/></Text>
                </Button>
              </Right>
           
            </ListItem>
          </List>
          <List>
            <ListItem thumbnail>
            <Left>
                <Thumbnail square source={{ uri: 'https://png.icons8.com/ios/50/000000/lightning-bolt.png'}} />
              </Left>
              <Body>
                <Text>Accident Service General Hospital</Text>
                <Text note numberOfLines={1}>011-2691111</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => Communications.phonecall('011-2691111', true)}>
                  <Text><Ionicons name='ios-call' size={responsiveFontSize(3)}/></Text>
                </Button>
              </Right>
           
            </ListItem>
          </List>
          <List>
            <ListItem thumbnail>
            <Left>
                <Thumbnail square source={{ uri: 'https://png.icons8.com/metro/50/000000/poison.png' }} />
              </Left>
              <Body>
                <Text>Poison Information Centre</Text>
                <Text note numberOfLines={1}>011-2691111</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => Communications.phonecall('011-2691111', true)}>
                  <Text><Ionicons name='ios-call' size={responsiveFontSize(3)}/></Text>
                </Button>
              </Right>
           
            </ListItem>
          </List>
          <List>
            <ListItem thumbnail>
            <Left>
                <Thumbnail square source={{ uri: 'https://png.icons8.com/metro/50/000000/error.png' }} />
              </Left>
              <Body>
                <Text>Electricity Break Down	</Text>
                <Text note numberOfLines={1}>011-2466660</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => Communications.phonecall('011-2466660', true)}>
                  <Text><Ionicons name='ios-call' size={responsiveFontSize(3)}/></Text>
                </Button>
              </Right>
           
            </ListItem>
          </List>
        </Content>
      </Container>
      
    );
  }
}
