import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, TextInput } from 'react-native-paper';
import * as db from '../utils/db';
import { AuthContext } from '../providers/AuthProvider';

const UpdateProfile = () => {
  const { user } = useContext(AuthContext);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [name, setName] = useState(user?.fullName);
  const [rank, setRank] = useState(user?.rank);
  const [year, setYear] = useState(user?.gradYear.toString());
  const [boardPos, setBoardPos] = useState(user?.boardPosition.toString());
  const [profilePic, setProfilePic] = useState(user?.profileImagePath.toString());


  const showDialog = () => setVisibleDialog(true);

  const hideDialog = () => setVisibleDialog(false);

  const update = () => {
    const yearNum = parseInt(year)
    if (isNaN(yearNum)) {
      alert('Invalid graduation year.')
      return 
    } 

    let changed = false;

    if (user?.fullName != name) {
      db.updateUsername(user.id, name)
      changed = true;
    }
    if (user?.rank != rank) {
      db.updateRank(user.id, rank)
      changed = true
    }
    if (user?.gradYear !=  yearNum ) {
      db.updateYear(user.id, yearNum)
      changed = true
    } 
    if (user?.boardPosition != boardPos) {
      db.updateBoardPosition(user.id, boardPos)
      changed = true
    }
    // if(user?.profileImagePath != profilePic) {
    //   db.updatePic(user.profileImagePath, profilePic)
    //   changed = true
    // }

    if (changed) {
      alert('Updated personal info. Please restart the app for changes to take place.')
      hideDialog()
    }
    else {
      alert('No changes made.')
    }
  }

  const onFileChange = (e) => {
    const file = e.target.files[e]
    const storageRef = db.storage().ref()
    const fileRef = storage.child(file.name)
    fileRef.put(file).then()
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
                label="Rank"
                value={rank}
                onChangeText={text => setRank(text)}
            />
            <TextInput
                label="Board Position"
                value={boardPos}
                onChangeText={text => setBoardPos(text)}
            />
            {/* <TextInput
                label="Profile Picture"
                value={profilePic}
                onChangeText={text => setProfilePic(text)}
            /> */}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={update}> Update </Button>
            <Button onPress={hideDialog}> Close </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default UpdateProfile;
