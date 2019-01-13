import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import LoginScreen from './app/screens/Auth/LoginScreen.js';
import HomeScreen from './app/screens/HomeScreen.js';
import SignUpScreen from './app/screens/Auth/SignUpScreen.js';

import ChatScreen from './app/screens/Chat/ChatScreen.js';
import ChatMenu from './app/screens/Chat/ChatMenu.js';
import ChatScreenMASFabrics from './app/screens/Chat/MASFabrics/ChatScreen.js';
import ChatScreenMASmatrix from './app/screens/Chat/MASmatrix/ChatScreen.js';
import ChatScreenNoyonLanka from './app/screens/Chat/NoyonLanka/ChatScreen.js';
import ChatScreenTextprintLanka from './app/screens/Chat/TextprintLanka/ChatScreen.js';
import ChatScreenTrischelFabric from './app/screens/Chat/TrischelFabric/ChatScreen.js';

//Settings
import SettingsScreen from './app/screens/Settings/SettingsScreen.js';
import ChangePassword from './app/screens/Settings/ChangePassword';
import MyProfile from './app/screens/Settings/MyProfile';
import StepCount from './app/screens/Settings/StepCount';

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

//Information
import InformationScreen from './app/screens/Information/Index';

//Notifications
import NotificationsScreen from './app/screens/Notifications/Index';
import Competitions from './app/screens/Competitions/Competitions';
import ProWalker from './app/screens/Competitions/ProWalker'
import * as appConst from './app/constants/Constants';

import UserList from './app/screens/UserList/index';
import UserProfile from './app/screens/UserList/userProfile'

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

const AppStack = createStackNavigator(
  { 

    Home: HomeScreen, IncidentReporting: IncidentReporting, Chat: ChatScreen, Settings: SettingsScreen, Tasks: TaskScreen, AddHealth:AddHealthScreen, Monitoring:HealthScreen,
    CompleteTask:CompleteTaskScreen, ApprovalPending:ApprovalPendingScreen, ViewTask:ViewTaskScreen, ApproveTask:ApproveTaskScreen, Information: InformationScreen,
    ChangePassword: ChangePassword, MyProfile: MyProfile, Competitions: Competitions, ProWalker: ProWalker,
    Notifications: NotificationsScreen, StepCount: StepCount, ChatMenu: ChatMenu, ChatMASFabrics: ChatScreenMASFabrics, ChatMASmatrix: ChatScreenMASmatrix,
    ChatNoyonLanka: ChatScreenNoyonLanka, ChatTextprintLanka: ChatScreenTextprintLanka, ChatTrischelFabric: ChatScreenTrischelFabric, UserList:UserList, UserProfile:UserProfile

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
