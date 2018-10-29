import React, {Component} from 'react';
import {Container,Tabs,Tab } from 'native-base';
import Tab1 from './PublicNotifications';
import Tab2 from './PrivateNotifications';

import RightHeaderButtons from '../../components/RightHeaderButtons.js';


export default class Notifications extends Component{
  static navigationOptions = ({navigation}) => ({
    title: 'Notifications',
    headerRight: (
        <RightHeaderButtons navigation={navigation}/>
    ),
    
  });
  render(){
    return(
      <Container>
        <Tabs tabBarUnderlineStyle={{backgroundColor: 'white'}}>
          <Tab heading="Public" tabStyle={{backgroundColor: '#009688',}} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#009688'}} activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
            <Tab1/>
          </Tab>
          <Tab heading="Private" tabStyle={{backgroundColor: '#009688', }} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#009688'}} activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
            <Tab2/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}