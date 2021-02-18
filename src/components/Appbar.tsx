import * as React from 'react';
import { Appbar } from 'react-native-paper';
import LogoutBtn from './LogoutBtn';
import styles from './styles';


const myAppBar = ({title}) => (
    <Appbar.Header >
        <LogoutBtn></LogoutBtn>
        <Appbar.Content title = {title}/>
        <Appbar.Action icon={require('../../assets/penn_logo.png')}></Appbar.Action>
        <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
);

export default myAppBar;