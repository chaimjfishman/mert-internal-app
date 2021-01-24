import React, { useContext } from 'react';
import { Button } from 'react-native-paper';
import { AuthContext } from '../providers/AuthProvider';
import * as auth from '../utils/auth';


const LogoutBtn = () => {
    const { logout } = useContext(AuthContext);

    return (
        <Button 
            icon="logout" 
            mode="text" 
            onPress={() => {
                try {
                    auth.logout();
                    logout();
                } catch (err) {
                    alert(err);
                }
            }}
        >
        Logout
      </Button>
    );   
}

export default LogoutBtn;

