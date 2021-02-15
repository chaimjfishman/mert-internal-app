import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, TextInput } from 'react-native-paper';
import * as db from '../utils/db';
import { AuthContext } from '../providers/AuthProvider';

const UpdateProfile = () => {
  const { user } = useContext(AuthContext);
  const [visibleDialog, setVisibleDialog] = React.useState(false);
  const [name, setName] = React.useState(user?.fullName);
  const [rank, setRank] = React.useState(user?.rank);
  const [year, setYear] = React.useState(user?.gradYear.toString());
  const [boardPos, setBoardPos] = React.useState(user?.boardPosition.toString());
  const [profilePic, setProfilePic] = React.useState(user?.profileImagePath.toString());


  const showDialog = () => setVisibleDialog(true);

  const hideDialog = () => setVisibleDialog(false);

  const update = () => {
    if (user?.fullName != name) {
      db.updateUsername(user.id, name)
    }
    if (user?.rank != rank) {
      db.updateRank(user.id, rank)
    }
    const yearNum = parseInt(year)
    if (!isNaN(yearNum)) {
      db.updateYear(user.id, yearNum)
    } 
    if (user?.boardPosition != boardPos) {
      db.updateBoardPosition(user.id, boardPos)
    }
    if(user?.profileImagePath != profilePic) {
      db.updatePic(user.profileImagePath, profilePic)
    }

  }

  return (
    <View>
      <Button onPress={showDialog}>Update User Info</Button>
      <Portal>
        <Dialog visible={visibleDialog} onDismiss={hideDialog}>
          <Dialog.Title>Update User Info</Dialog.Title>
          <Dialog.Content>
            {/* <Paragraph>This is simple dialog</Paragraph> */}
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
            <TextInput
                label="Profile Picture"
                value={profilePic}
                onChangeText={text => setProfilePic(text)}
            />
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
