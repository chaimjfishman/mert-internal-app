import React from 'react';
import { Text } from 'react-native';
import * as Linking from 'expo-linking';
import { Contact } from '../constants/collectionTypes';

export default class ForwardLink extends React.Component<Contact|any>{
  _handlePress = () => {
    Linking.openURL(this.props.href);
    this.props.onPress && this.props.onPress();
  };

  render() {
    return (
      <Text {...this.props} onPress={this._handlePress}>
        {this.props.name}
      </Text>
    );
  }
}