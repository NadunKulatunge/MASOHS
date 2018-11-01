import React, {Component} from 'react';
import {Container,Header,Tabs,Tab,ScrollableTab} from 'native-base';
import Tab1 from './FirstAid';
import Tab2 from './Tips';
import Tab3 from './Emergency';
import Tab4 from './Contacts';
import RightHeaderButtons from '../../components/RightHeaderButtons.js';


export default class Announcements extends Component{
  static navigationOptions = ({navigation}) => ({
    title: 'INFORMATION',
    headerRight: (
        <RightHeaderButtons navigation={navigation}/>
    ),
    
  });
  render(){
    return(
      <Container>
        <Tabs tabBarUnderlineStyle={{backgroundColor: 'white'}} renderTabBar={()=> <ScrollableTab />}>
          <Tab heading="First Aid" tabStyle={{backgroundColor: '#009688',}} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#009688'}} activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
            <Tab1/>
          </Tab>
          <Tab heading="Tips" tabStyle={{backgroundColor: '#009688', }} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#009688'}} activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
            <Tab2/>
          </Tab>
          <Tab heading="Emergency" tabStyle={{backgroundColor: '#009688',}} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#009688'}} activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
            <Tab3/>
          </Tab>
          <Tab heading="Contacts" tabStyle={{backgroundColor: '#009688',}} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#009688'}} activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
            <Tab4/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}