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
import AuthLoadingScreen from './app/screens/Loading.js';


export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

const AppStack = createStackNavigator({ Home: HomeScreen, IncidentReporting: IncidentReporting, Chat: ChatScreen, Settings: SettingsScreen}); //After Authorization
const AuthStack = createStackNavigator({ Login: LoginScreen, SignUp: SignUpScreen }); //Before Authorization

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

