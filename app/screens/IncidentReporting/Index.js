import React, {Component} from 'react';
import {Container,Header,Tabs,Tab} from 'native-base';
import Tab1 from './Complaints';
import Tab2 from './Accidents';
import RightHeaderButtons from '../../components/RightHeaderButtons.js';


export default class IncidentReporting extends Component{
  static navigationOptions = ({navigation}) => ({
    title: 'REPORT',
    headerRight: (
        <RightHeaderButtons navigation={navigation}/>
    ),
    
  });
  render(){
    return(
      <Container>
        <Tabs tabBarUnderlineStyle={{backgroundColor: 'white'}}>
          <Tab heading="RISKS" tabStyle={{backgroundColor: '#009688', }} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#009688'}} activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
            <Tab1/>
          </Tab>
          <Tab heading="ACCIDENTS" tabStyle={{backgroundColor: '#009688',}} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#009688'}} activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
            <Tab2/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
