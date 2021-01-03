import React, { useContext } from 'react';
import { TouchableOpacity, Text} from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import * as auth from '../utils/auth';


const LogoutBtn = () => {
    const { logout } = useContext(AuthContext);

    return (
        <TouchableOpacity
            onPress={() => {
                try {
                    auth.logout();
                    logout();
                } catch (err) {
                    alert(err);
                }
            }}
        >
            <Text>LOGOUT</Text>
        </TouchableOpacity> 
    );   
}

export default LogoutBtn;

