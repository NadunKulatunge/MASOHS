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
                <Text>Police</Text>
                <Text note numberOfLines={1}>119</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => Communications.phonecall('119', true)}>
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
