/**
 * To add URLs inside the react native app
 * How to use:
 * import Anchor from '../../components/Anchor'
 * <Anchor href="https://google.com">Go to Google</Anchor>
 */
import React, { Component } from 'react';
import { Linking } from 'react-native';
import { Text } from 'native-base';
export default class Anchor extends React.Component {
  _handlePress = () => {
    Linking.openURL(this.props.href);
    this.props.onPress && this.props.onPress();
  };

  render() {
    return (
      <Text {...this.props} onPress={this._handlePress}>
        {this.props.children}
      </Text>
    );
  }
}
