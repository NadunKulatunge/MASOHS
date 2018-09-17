import React, {Component} from 'react';
import {Container,Header,Tabs,Tab} from 'native-base';
import Tab1 from './complaints';
import Tab2 from './accidents';
import RightHeaderButtons from '../../components/RightHeaderButtons.js';


export default class IncidentReporting extends Component{
  static navigationOptions = ({navigation}) => ({
    title: 'Reporting',
    headerRight: (
        <RightHeaderButtons navigation={navigation}/>
    ),
    headerStyle: {
      backgroundColor: '#8BC24A',
      elevation: 0,
      borderBottomWidth: 0,
    
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });
  render(){
    return(
      <Container>
        <Tabs tabBarUnderlineStyle={{backgroundColor: 'white'}}>
          <Tab heading="RISKS" tabStyle={{backgroundColor: '#8BC24A', }} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#8BC24A'}} activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
            <Tab1/>
          </Tab>
          <Tab heading="ACCIDENTS" tabStyle={{backgroundColor: '#8BC24A',}} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#8BC24A'}} activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
            <Tab2/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
