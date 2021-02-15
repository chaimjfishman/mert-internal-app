import * as React from 'react';
import { Appbar } from 'react-native-paper';
import LogoutBtn from './LogoutBtn';
import styles from './styles';


const myAppBar = () => (
    <Appbar.Header>
        <LogoutBtn></LogoutBtn>
        <Appbar.Content title=""/>
        <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
);

export default myAppBar;