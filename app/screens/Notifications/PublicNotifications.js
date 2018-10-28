import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Root, View, Spinner } from 'native-base';
import { Font, AppLoading } from "expo";
import {Ionicons} from '@expo/vector-icons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import firebase from 'firebase';
import { withNavigation } from 'react-navigation';

class PublicNotifications extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true, fire_loaded: false };
  }

  publicNotifications=[]

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });

    firebase.database().ref('publicNotifications/').orderByKey().once('value', (snapshot) => {
      snapshot.forEach((item)=>{
         this.publicNotifications.push(item);
        
      }) 
      //console.log(this.publicNotifications)
      this.setState({fire_loaded:true});

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
            {this.state.fire_loaded ?
            <Content>
              <List dataArray={this.publicNotifications.reverse()}  
              renderRow={(item) =>
              <ListItem thumbnail>
                <Left>
                  {item.val().navigateTo =='Chat'? (
                  <Ionicons style={{color: 'rgba(0,0,0,0.5)'}} name='ios-chatbubbles' size={responsiveFontSize(5)}/>
                  ) : (
                    <View></View>
                  )}
                </Left>
                <Body>
                  <Text>{item.val().title}</Text>
                  <Text note numberOfLines={1}>{item.val().body}</Text>
                </Body>
                <Right>
                  {item.val().navigateTo ? (
                    <Button transparent onPress={() => this.props.navigation.navigate(item.val().navigateTo)} >
                    <Text>View</Text>
                    </Button>
                  ) : (
                    <View></View>
                  )}
                </Right>
              </ListItem>
              }>
            </List>
          </Content>
          :
          <Content>
          <Spinner color='green' />
          </Content>
          }
        </Container>
    );
  }
}

export default withNavigation(PublicNotifications);