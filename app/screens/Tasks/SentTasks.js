import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { Font, AppLoading } from "expo";
import Fire from '../Chat/Fire';
import firebase from 'firebase';
import { withNavigation } from 'react-navigation';


class SentTasks extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            fire1_loaded:false,
            fire2_loaded:false
        };
    }

    pending=[]
    completed=[];
    raised=[];
    userid=Fire.shared.uid;

    async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });

         firebase.database().ref('accidents/').orderByChild('userid').equalTo(this.userid).on('value', (snapshot) => {
           this.pending=[];
           this.completed=[];
           this.raised=[];
          snapshot.forEach((item)=>{
            if(item.val().status=="pending"){
              this.pending.push(item);
             }else if(item.val().status=="completed"){
               this.completed.push(item);
             }else if(item.val().status=="raised"){
                this.raised.push(item);
              }
          }) 
          this.setState({fire1_loaded:true});
          this.forceUpdate();
        });

         firebase.database().ref('complaints/').orderByChild('userid').equalTo(this.userid).on('value', (snapshot) => {
          this.pending=[];
          this.completed=[];
          this.raised=[];
          snapshot.forEach((item)=>{
            if(item.val().status=="pending"){
              this.pending.push(item);
             }else if(item.val().status=="completed"){
               this.completed.push(item);
             }else if(item.val().status=="raised"){
                this.raised.push(item);
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
            <List dataArray={this.pending.reverse()}
            renderRow={(item) =>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/pending.png')} />
              </Left>
              <Body>
                <Text>{item.val().date}</Text>
                <Text note numberOfLines={1}>{item.val().msg}</Text>
              </Body>
              <Right>
                <Button transparent onPress={()=>this.props.navigation.navigate('ApproveTask',{item})}>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
            }>
          </List>
          <List dataArray={this.raised.reverse()}
            renderRow={(item) =>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/risk.png')} />
              </Left>
              <Body>
                <Text>{item.val().date}</Text>
                <Text note numberOfLines={1}>{item.val().msg}</Text>
              </Body>
              <Right>
                <Button transparent onPress={()=>this.props.navigation.navigate('ViewTask',{item})}>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
            }>
          </List>
          <List dataArray={this.completed.reverse()}
            renderRow={(item) =>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/check.png')} />
              </Left>
              <Body>
                <Text>{item.val().date}</Text>
                <Text note numberOfLines={1}>{item.val().msg}</Text>
              </Body>
              <Right>
                <Button transparent onPress={()=>this.props.navigation.navigate('ViewTask',{item})}>
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

export default withNavigation(SentTasks);
