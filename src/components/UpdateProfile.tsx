import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import * as db from '../utils/db';
import { AuthContext } from '../providers/AuthProvider';

type UpdateProfile = {
  setProfileUsername: Dispatch<SetStateAction<string>>,
  setProfileGradYear: Dispatch<SetStateAction<number>>,
  setProfileJoined: Dispatch<SetStateAction<string>>,
}

const UpdateProfile = ({setProfileUsername, setProfileJoined, setProfileGradYear}: UpdateProfile) => {
  const { user } = useContext(AuthContext);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [name, setName] = useState(user?.fullName);
  const [year, setYear] = useState(user?.gradYear.toString());
  const [joined, setJoined] = useState(user?.dateJoinedMERT.toString());

  const showDialog = () => setVisibleDialog(true);
  const hideDialog = () => setVisibleDialog(false);

  const update = () => {
    let changed = false;

    const yearNum = parseInt(year)
    if (isNaN(yearNum)) {
      alert('Invalid graduation year.')
      return 
    } 
    if (user?.gradYear !=  yearNum ) {
      db.updateYear(user.id, yearNum);
      setProfileGradYear(yearNum);
      changed = true;
    } 
    if (user?.joined !=  joined ) {
      db.updateDateJoined(user.id, joined);
      setProfileJoined(joined);
      changed = true;
    } 
    if (user?.fullName != name) {
      db.updateUsername(user.id, name);
      setProfileUsername(name);
      changed = true;
    }

    if (changed) {
      alert('Profile Successfully Updated!')
      hideDialog()
    }
    else {
      alert('No changes made')
    }
  }

  return (
    <View>
      <Button onPress={showDialog}>Update User Info</Button>
      <Portal>
        <Dialog visible={visibleDialog} onDismiss={hideDialog}>
          <Dialog.Title>Update User Info</Dialog.Title>
          <Dialog.Content>
            <TextInput
                label="Username"
                value={name}
                onChangeText={text => setName(text)}
            />
            <TextInput
                label="Graduation Year"
                value={year}
                onChangeText={text => setYear(text)}
            />
            <TextInput
                label="Date Joined"
                value={joined}
                onChangeText={text => setJoined(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={update}> Update </Button>
            <Button onPress={hideDialog}> Cancel </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default UpdateProfile;
