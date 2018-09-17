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
      backgroundColor: '#AED581',
      elevation: 0,
    
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });
  render(){
    return(
      <Container>
        <Tabs>
          <Tab heading="Risks" tabStyle={{backgroundColor: '#AED581', borderTop: 0}} textStyle={{color: 'black'}} activeTabStyle={{backgroundColor: '#AED581'}} activeTextStyle={{color: 'black', fontWeight: 'normal'}}>
            <Tab1/>
          </Tab>
          <Tab heading="Accidents" tabStyle={{backgroundColor: '#AED581'}} textStyle={{color: 'black'}} activeTabStyle={{backgroundColor: '#AED581'}} activeTextStyle={{color: 'black', fontWeight: 'normal'}}>
            <Tab2/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
