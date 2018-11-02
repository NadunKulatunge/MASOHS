import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { Font, AppLoading } from "expo";
import {Ionicons} from '@expo/vector-icons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default class Tips extends Component {
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
            <Card style={{flex: 0}}>
                <CardItem header bordered>
                <Left>
                    <Ionicons name='md-bulb' size={responsiveFontSize(5)}/>
                    <Body>
                    <Text>Safety Tip #1</Text>
                    </Body>
                </Left>
                </CardItem>
                <CardItem>
                <Body >
                    <Image source={{uri: 'https://image.freepik.com/free-vector/happy-kids-back-to-school_53876-40283.jpg'}} style={{width: '100%', height: 200, flex: 1}}/>
                    <Text style={{marginTop: 20,}}>
                        Educate everyone in the workplace about the safety requirements and consider posting a list of workplace safety tips. A workplace safety training will help them reduce or eliminate injuries and illnesses from occurring in the workplace.
                    </Text>
                </Body>
                </CardItem>
                <CardItem footer bordered>
                <Left>
                    <Button transparent textStyle={{color: '#87838B'}}>
                    <Ionicons color='#87838B' name='ios-image-outline' size={responsiveFontSize(3)}/>
                    <Text style={{color:'#87838B'}}>Created by Rawpixel.com - Freepik.com</Text>
                    </Button>
                </Left>
                </CardItem>
            </Card>
            </Content>
        </Container>
    );
  }
}
