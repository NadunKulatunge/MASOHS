import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { Font, AppLoading } from "expo";
import Fire from '../Chat/Fire';
import firebase from 'firebase';

export default class PendingTaks extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            fire1_loaded:false,
            fire2_loaded:false
        };
    }

    accidents=[]
    complaints=[];
    userid=Fire.shared.uid;

    async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });

        await firebase.database().ref('accidents/').orderByChild('reciever').equalTo(this.userid).on('value', (snapshot) => {
          snapshot.forEach((item)=>{
            if(item.val().status=="raised"){
             this.accidents.push(item);
            }
          }) 
          this.setState({fire1_loaded:true});
          this.forceUpdate();
        });

        await firebase.database().ref('complaints/').orderByChild('reciever').equalTo(this.userid).on('value', (snapshot) => {
          snapshot.forEach((item)=>{
            if(item.val().status=="raised"){
              this.complaints.push(item);
             }
          }) 
          this.setState({fire2_loaded:true});
          this.forceUpdate();
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
            {this.state.fire1_loaded && this.state.fire2_loaded?
            <Content>
            <List dataArray={this.accidents}
            renderRow={(item) =>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/accident.png')} />
              </Left>
              <Body>
                <Text>{item.val().date}</Text>
                <Text note numberOfLines={1}>{item.val().username}</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
            }>
          </List>
          <List dataArray={this.complaints}
            renderRow={(item) =>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/risk.png')} />
              </Left>
              <Body>
                <Text>{item.val().date}</Text>
                <Text note numberOfLines={1}>{item.val().username}</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
            }>
          </List>
          </Content>
          :
          <Content>
          <Text>Loading information. If this is taking too long please check your internet connection</Text>
          </Content>
          }
          </Container>
        );
  }  
}

