import AuthContextProvider from "./contexts/AuthContext";
import HomeStack from "./navigation/HomeStack";
import { NavigationContainer } from '@react-navigation/native';
import authModule from '@react-native-firebase/auth';
import firestoreModule from '@react-native-firebase/firestore';
import storageModule from '@react-native-firebase/storage';

export const auth = authModule();
export const firestore = firestoreModule();
export const storage = storageModule();

const App = () => {
    return (
        <AuthContextProvider>
            <NavigationContainer>
                <HomeStack/>
            </NavigationContainer>
        </AuthContextProvider>
    )
};

export default App;