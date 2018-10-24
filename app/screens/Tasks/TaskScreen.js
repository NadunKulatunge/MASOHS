import React, {Component} from 'react';
import {Container,Header,Tabs,Tab} from 'native-base';
import Tab1 from './PendingTasks';
import Tab2 from './FinishedTasks';
import Tab3 from './RedirectedTasks';
import Tab4 from './SentTasks';

import RightHeaderButtons from '../../components/RightHeaderButtons.js';


export default class TasksScreen extends Component{
  static navigationOptions = ({navigation}) => ({
    title: 'My Tasks',
    headerRight: (
        <RightHeaderButtons navigation={navigation}/>
    ),
    
  });
  render(){
    return(
      <Container>
        <Tabs tabBarUnderlineStyle={{backgroundColor: 'white'}}>
          <Tab heading="Pending" tabStyle={{backgroundColor: '#009688', }} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#009688'}} activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
            <Tab1/>
          </Tab>
          <Tab heading="Completed" tabStyle={{backgroundColor: '#009688',}} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#009688'}} activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
            <Tab2/>
          </Tab>
          <Tab heading="Reassigened" tabStyle={{backgroundColor: '#009688',}} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#009688'}} activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
            <Tab3/>
          </Tab>
          <Tab heading="Sent" tabStyle={{backgroundColor: '#009688',}} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#009688'}} activeTextStyle={{color: 'white', fontWeight: 'bold'}}>
            <Tab4/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
