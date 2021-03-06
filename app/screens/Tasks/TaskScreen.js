import React, {Component} from 'react';
import {Container,Tabs,Tab} from 'native-base';
import Tab1 from './PendingTasks';
import Tab2 from './FinishedTasks';
import Tab4 from './SentTasks';

import RightHeaderButtons from '../../components/RightHeaderButtons.js';


export default class TasksScreen extends Component{
  static navigationOptions = ({navigation}) => ({
    title: 'Tasks',
    headerRight: (
        <RightHeaderButtons navigation={navigation}/>
    ),
    
  });
  render(){
    return(
      <Container>
        <Tabs tabBarUnderlineStyle={{backgroundColor: 'white'}}>
          <Tab heading="My Raised" tabStyle={{backgroundColor: '#009688',}} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#009688'}} activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
            <Tab4/>
          </Tab>
          <Tab heading="Pending" tabStyle={{backgroundColor: '#009688', }} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#009688'}} activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
            <Tab1/>
          </Tab>
          <Tab heading="Completed" tabStyle={{backgroundColor: '#009688',}} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#009688'}} activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
            <Tab2/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
