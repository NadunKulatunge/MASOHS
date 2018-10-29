import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import LoginScreen from './app/screens/Auth/LoginScreen.js';
import HomeScreen from './app/screens/HomeScreen.js';
import SignUpScreen from './app/screens/Auth/SignUpScreen.js';

import ChatScreen from './app/screens/Chat/ChatScreen.js'

//Settings
import SettingsScreen from './app/screens/Settings/SettingsScreen.js'

import IncidentReporting from './app/screens/IncidentReporting/Index.js';
import TaskScreen from './app/screens/Tasks/TaskScreen.js';
import HealthScreen from './app/screens/Monitoring/HealthScreen.js';
import AddHealthScreen from './app/screens/Monitoring/AddHealthScreen.js';
import AuthLoadingScreen from './app/screens/Loading.js';

//Task Expanded
import CompleteTaskScreen from './app/screens/Tasks/Expand/CompleteTask.js';
import ApprovalPendingScreen from './app/screens/Tasks/Expand/ApprovalPendingTask.js';
import ViewTaskScreen from './app/screens/Tasks/Expand/ViewTask.js';
import ApproveTaskScreen from './app/screens/Tasks/Expand/ApproveTask.js';

//Announcements
import AnnouncementScreen from './app/screens/Announcements/Index';

//Notifications
import NotificationsScreen from './app/screens/Notifications/Index';

import * as appConst from './app/constants/Constants';

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

const AppStack = createStackNavigator(
  { 
    Home: HomeScreen, IncidentReporting: IncidentReporting, Chat: ChatScreen, Monitoring:HealthScreen, AddHealth:AddHealthScreen, Settings: SettingsScreen, Tasks: TaskScreen, 
    CompleteTask:CompleteTaskScreen, ApprovalPending:ApprovalPendingScreen, ViewTask:ViewTaskScreen, ApproveTask:ApproveTaskScreen, Announcements: AnnouncementScreen,
    Notifications: NotificationsScreen
  },

  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: appConst.THEME_COLOUR,
        elevation: 0,
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          fontWeight: 'bold',
      },
    },
  }
  
  
  ); //After Authorization
const AuthStack = createStackNavigator({ Login: LoginScreen, SignUp: SignUpScreen }); //Before Authorization

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
  
);
