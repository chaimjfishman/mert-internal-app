import React, { useContext } from 'react';
// import { TouchableOpacity, Text} from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../providers/AuthProvider';
import * as auth from '../utils/auth';


const LogoutBtn = () => {
    const { logout } = useContext(AuthContext);

    return (
        <Button 
            icon="logout" 
            mode="contained" 
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

