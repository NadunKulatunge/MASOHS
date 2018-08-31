import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import LoginScreen from './app/screens/LoginScreen.js'
import HomeScreen from './app/screens/HomeScreen.js'
import IncidentReporting from './app/screens/IncidentReporting/Index.js'

export default class App extends React.Component {
  render() {
    return (
      <AppStackNavigator />
    );
  }
}

const AppStackNavigator = createStackNavigator({
  Login: LoginScreen,
  Home: HomeScreen,
  IncidentReporting: IncidentReporting

})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

