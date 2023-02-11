import React, {createContext, useState} from 'react';
import { AuthContextType, SetUserType, UserType } from '../global/types';



type AuthContextProviderPropsType = {
    children:JSX.Element
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({children}:AuthContextProviderPropsType) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [isAdminArr, setAdminsArr] = useState<string[]>([]);

    return (
        <AuthContext.Provider
            value={{
                isAdmin:(user!=null) && isAdminArr.includes(user.email),
                setAdminsArr,
                user:user,
                setUser:setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;