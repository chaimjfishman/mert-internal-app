import React from 'react';
import { Text } from 'react-native';
import * as Linking from 'expo-linking';
import { Contact } from '../constants/collectionTypes';
import { DataTable } from 'react-native-paper';

export default class ForwardLink extends React.Component<any>{
  _handlePress = () => {
    Linking.openURL(this.props.href);
    this.props.onPress && this.props.onPress();
  };

  render() {
    return (
      <Text {...this.props} onPress={this._handlePress} style={{justifyContent: 'flex-start'}}>
        {this.props.text}
      </Text>
      // <DataTable.Cell {...this.props} onPress={this._handlePress}>
      //   {this.props.text}
      // </DataTable.Cell>
    );
  }
}