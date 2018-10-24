import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { Font, AppLoading } from "expo";
import Fire from '../Chat/Fire';
import firebase from 'firebase';

export default class FinishedTasks extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loading:true,
        };
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

        var items = [
            {name:'Ushira Karunasena', date:'10/10/2018'},{name: 'Chamin Kahaandawaarachchi', date:'08/10/2018'}
          ];
        return (
          <Container>
            <Content>
            <List dataArray={items}
            renderRow={(item) =>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/check.png')} />
              </Left>
              <Body>
                <Text>{item.date}</Text>
                <Text note numberOfLines={1}>{item.name}</Text>
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
          </Container>
        );
    }    
      
}

