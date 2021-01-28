import React, { useContext } from 'react';
import { Text } from 'react-native';
import * as db from '../utils/db';
import { AuthContext } from "../providers/AuthProvider";

export default class UpdateFirebase extends React.Component{
  _handlePress = () => {
    const { user } = useContext(AuthContext);
    db.updateUsername("3Tjrv83f8HQCldTpCvROcdYk0e52", "Pedro Sacramento")
  };

  render() {
    return (
      <Text {...this.props} onPress={this._handlePress}>
        Click Here
      </Text>
    );
  }
}