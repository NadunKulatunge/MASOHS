import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Root } from 'native-base';
import { Font, AppLoading } from "expo";
import Anchor from '../../components/Anchor';
import {Ionicons} from '@expo/vector-icons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default class FirstAid extends Component {
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
                <Thumbnail square source={{ uri: 'Image URL' }} />
              </Left>
              <Body>
                <Text>Heart Attack</Text>
                <Text note numberOfLines={1}>Persistent vice-like chest pain</Text>
              </Body>
              <Right>
                <Anchor href="https://www.mayoclinic.org/first-aid/first-aid-heart-attack/basics/art-20056679"><Ionicons name='md-globe' size={responsiveFontSize(3)}/></Anchor>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
