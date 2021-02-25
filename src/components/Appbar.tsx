import * as React from 'react';
import { Appbar } from 'react-native-paper';
import LogoutBtn from './LogoutBtn';
import styles from './styles';

type AppBarProps = {
    title: string,
}

const AppBar = ({title}: AppBarProps) => (
    <Appbar.Header >
        <LogoutBtn></LogoutBtn>
        <Appbar.Content title = {title}/>
        <Appbar.Action icon={require('../../assets/penn_logo.png')}></Appbar.Action>
    </Appbar.Header>
);

export default AppBar;