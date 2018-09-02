import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import LoginScreen from './app/screens/Auth/LoginScreen.js';
import HomeScreen from './app/screens/HomeScreen.js';
import IncidentReporting from './app/screens/IncidentReporting/Index.js';
import AuthLoadingScreen from './app/screens/Loading.js'


export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

const AppStack = createStackNavigator({ Home: HomeScreen, IncidentReporting: IncidentReporting });
const AuthStack = createStackNavigator({ Login: LoginScreen });

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

