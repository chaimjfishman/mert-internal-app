import React, { useState } from "react";
import { User } from "../constants/collectionTypes";

type authContextType = {
    user: User | null;
    login: (newUser: User) => void;
    logout: () => void;
}
export const AuthContext = React.createContext<authContextType>({
    user: null,
    login: () => {},
    logout: () => {}
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    return (
        <AuthContext.Provider
            value={{
                user,
                login: (newUser: User) => {
                    console.log('authprovider with new user:')
                    console.log(newUser)
                    setUser(newUser);
                },
                logout: () => {
                    //TODO
                    setUser(null);
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
